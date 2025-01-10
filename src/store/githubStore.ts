import { create } from 'zustand';
import { Octokit } from '@octokit/rest';
import type { PullRequest, Repository } from '../types/github';
import { persist } from 'zustand/middleware';

interface GithubStore {
  repository: Repository | null;
  pullRequests: PullRequest[];
  isLoading: boolean;
  error: string | null;
  checkedPRs: Record<string, boolean>;
  setRepository: (repoUrl: string) => Promise<void>;
  fetchPullRequests: () => Promise<void>;
  togglePRCheck: (prUrl: string) => void;
}

const parseRepoUrl = (url: string): Repository | null => {
  try {
    const regex = /github\.com\/([^/]+)\/([^/]+)/;
    const match = url.match(regex);
    if (!match) return null;
    
    return {
      owner: match[1],
      name: match[2],
      full_name: `${match[1]}/${match[2]}`
    };
  } catch {
    return null;
  }
};

const octokit = new Octokit({
  auth: import.meta.env.VITE_GITHUB_TOKEN,
  request: {
    fetch: fetch.bind(window),
  },
});

export const useGithubStore = create<GithubStore>()(
  persist(
    (set, get) => ({
      repository: null,
      pullRequests: [],
      isLoading: false,
      error: null,
      checkedPRs: {},

      setRepository: async (repoUrl: string) => {
        const repo = parseRepoUrl(repoUrl);
        if (!repo) {
          set({ error: 'Invalid repository URL' });
          return;
        }

        set((state) => ({
          repository: repo,
          error: null,
          checkedPRs: state.checkedPRs
        }));
        await get().fetchPullRequests();
      },

      fetchPullRequests: async () => {
        const { repository } = get();
        if (!repository) return;

        set({ isLoading: true, error: null });

        try {
          // Check rate limit first
          const { data: rateLimit } = await octokit.rateLimit.get();
          if (rateLimit.rate.remaining === 0) {
            const resetDate = new Date(rateLimit.rate.reset * 1000);
            throw new Error(`API rate limit exceeded. Resets at ${resetDate.toLocaleTimeString()}`);
          }

          const { data: prs } = await octokit.pulls.list({
            owner: repository.owner,
            repo: repository.name,
            state: 'all',
            sort: 'updated',
            direction: 'desc',
            per_page: 100,
          });

          // Fetch merged status and comments for each PR
          const prsWithDetails = await Promise.all(
            prs.map(async (pr) => {
              try {
                const [prDetails, reviewComments, issueComments] = await Promise.all([
                  pr.state === 'closed' ? 
                    octokit.pulls.get({
                      owner: repository.owner,
                      repo: repository.name,
                      pull_number: pr.number,
                    }) : 
                    Promise.resolve({ data: { merged: false } }),
                  octokit.pulls.listReviewComments({
                    owner: repository.owner,
                    repo: repository.name,
                    pull_number: pr.number,
                    per_page: 100,
                  }),
                  octokit.issues.listComments({
                    owner: repository.owner,
                    repo: repository.name,
                    issue_number: pr.number,
                    per_page: 100,
                  })
                ]);

                const totalComments = reviewComments.data.length + issueComments.data.length;

                return {
                  ...pr,
                  merged: prDetails.data.merged || false,
                  comments: totalComments
                } as PullRequest;
              } catch (err) {
                console.error(`Error fetching details for PR #${pr.number}:`, err);
                return {
                  ...pr,
                  merged: false,
                  comments: 0
                } as PullRequest;
              }
            })
          );

          set({ pullRequests: prsWithDetails, isLoading: false });
        } catch (err) {
          console.error('Failed to fetch pull requests:', err);
          const errorMessage = err instanceof Error ? err.message : 'Failed to fetch pull requests';
          set({ 
            error: errorMessage.includes('rate limit') ? 
              errorMessage : 
              'Failed to fetch pull requests. Please check the repository URL and your access permissions.',
            isLoading: false 
          });
        }
      },

      togglePRCheck: (prUrl: string) =>
        set((state) => ({
          checkedPRs: {
            ...state.checkedPRs,
            [prUrl]: !state.checkedPRs[prUrl]
          }
        })),
    }),
    {
      name: 'github-store',
      partialize: (state) => ({
        checkedPRs: state.checkedPRs,
      }),
    }
  )
);