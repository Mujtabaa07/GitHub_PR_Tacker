export interface PullRequest {
  number: number;
  title: string;
  state: 'open' | 'closed';
  merged: boolean;
  created_at: string;
  updated_at: string;
  closed_at: string | null;
  merged_at: string | null;
  html_url: string;
  user: {
    login: string;
    avatar_url: string;
  };
  assignees: Array<{
    login: string;
    avatar_url: string;
  }>;
  labels: Array<{
    name: string;
    color: string;
    description?: string;
  }>;
  comments: number;
}

export interface Repository {
  owner: string;
  name: string;
  full_name: string;
  checkedPRs?: CheckedPR[];
}

export interface CheckedPR {
  url: string;
  checked: boolean;
}