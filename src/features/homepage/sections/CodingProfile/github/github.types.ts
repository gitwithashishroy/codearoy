export interface GitHubUserData {
  login: string;
  public_repos: number;
  followers: number;
  created_at: string;
}

export interface GitHubRepo {
  name: string;
  description: string | null;
  stargazers_count: number;
  language: string | null;
  updated_at: string;
  html_url: string;
}

export interface GitHubContribution {
  date: string;
  contributionCount: number;
  color: string;
}

export interface GitHubStats {
  username: string;
  totalRepos: number;
  totalStars: number;
  totalCommits: number;
  followers: number;
  topLanguages: Array<{ name: string; percentage: number; color: string }>;
  recentRepos: Array<{
    name: string;
    description: string;
    stars: number;
    language: string;
    url: string;
  }>;
  contributions: GitHubContribution[];
}
