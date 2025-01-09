import { QueueService } from './QueueService';

interface APIResponse {
  error?: {
    message: string;
  };
  candidates?: Array<{
    content: {
      parts: Array<{
        text: string;
      }>;
    };
  }>;
}

export class AIService {
  private readonly API_URL = 'https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent';
  private queue: QueueService;
  private static instance: AIService;

  private constructor() {
    this.queue = QueueService.getInstance();
  }

  public static getInstance(): AIService {
    if (!AIService.instance) {
      AIService.instance = new AIService();
    }
    return AIService.instance;
  }

  public async makeRequest(prompt: string): Promise<string> {
    return this.queue.enqueue(async () => {
      const response = await fetch(
        `${this.API_URL}?key=${import.meta.env.VITE_GOOGLE_AI_KEY}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [{
              parts: [{
                text: prompt
              }]
            }],
            generationConfig: {
              temperature: 0.7,
              topK: 40,
              topP: 0.95,
              maxOutputTokens: 1024,
            },
            safetySettings: [
              {
                category: "HARM_CATEGORY_HARASSMENT",
                threshold: "BLOCK_MEDIUM_AND_ABOVE"
              },
              {
                category: "HARM_CATEGORY_HATE_SPEECH",
                threshold: "BLOCK_MEDIUM_AND_ABOVE"
              },
              {
                category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
                threshold: "BLOCK_MEDIUM_AND_ABOVE"
              },
              {
                category: "HARM_CATEGORY_DANGEROUS_CONTENT",
                threshold: "BLOCK_MEDIUM_AND_ABOVE"
              }
            ]
          })
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`API error: ${errorData.error?.message || response.statusText}`);
      }

      const data = await response.json() as APIResponse;
      
      if (data.error) {
        throw new Error(`AI error: ${data.error.message}`);
      }

      return data.candidates?.[0]?.content?.parts?.[0]?.text || 'No response generated';
    });
  }
}