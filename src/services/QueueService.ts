interface QueueItem {
  id: string;
  task: () => Promise<any>;
  resolve: (value: any) => void;
  reject: (error: any) => void;
  retries: number;
}

export class QueueService {
  private queue: QueueItem[] = [];
  private isProcessing = false;
  private readonly MAX_RETRIES = 3;
  private readonly RATE_LIMIT_DELAY = 60000; // 1 minute
  private lastRequestTime = 0;
  private requestsThisMinute = 0;
  private readonly MAX_REQUESTS_PER_MINUTE = 20; // Adjust based on HF limits

  private static instance: QueueService;

  public static getInstance(): QueueService {
    if (!QueueService.instance) {
      QueueService.instance = new QueueService();
    }
    return QueueService.instance;
  }

  public async enqueue<T>(task: () => Promise<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      const id = Math.random().toString(36).substring(7);
      this.queue.push({ id, task, resolve, reject, retries: 0 });
      this.processQueue();
    });
  }

  private async processQueue() {
    if (this.isProcessing || this.queue.length === 0) return;

    this.isProcessing = true;
    const item = this.queue[0];

    try {
      // Check rate limits
      await this.checkRateLimit();

      const result = await item.task();
      item.resolve(result);
      this.queue.shift();
      
      // Update rate limit tracking
      this.requestsThisMinute++;
      this.lastRequestTime = Date.now();
    } catch (error) {
      if (this.isRateLimitError(error) && item.retries < this.MAX_RETRIES) {
        // Move to end of queue and retry
        item.retries++;
        this.queue.shift();
        this.queue.push(item);
        await this.delay(this.RATE_LIMIT_DELAY);
      } else {
        item.reject(error);
        this.queue.shift();
      }
    } finally {
      this.isProcessing = false;
      this.processQueue();
    }
  }

  private async checkRateLimit(): Promise<void> {
    const now = Date.now();
    const timeSinceLastRequest = now - this.lastRequestTime;

    // Reset counter if a minute has passed
    if (timeSinceLastRequest > this.RATE_LIMIT_DELAY) {
      this.requestsThisMinute = 0;
    }

    // Wait if we've hit the rate limit
    if (this.requestsThisMinute >= this.MAX_REQUESTS_PER_MINUTE) {
      const waitTime = this.RATE_LIMIT_DELAY - timeSinceLastRequest;
      await this.delay(waitTime);
      this.requestsThisMinute = 0;
    }
  }

  private isRateLimitError(error: any): boolean {
    return error.message?.includes('rate limit') || 
           error.status === 429 ||
           error.message?.includes('too many requests');
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}