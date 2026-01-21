export interface GitHubRepo {
  id: number;
  name: string;
  description: string;
  html_url: string;
  homepage?: string;
  language: string;
  stargazers_count: number;
  forks_count: number;
  topics: string[];
}

export interface GitHubContribution {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

export interface GitHubLanguageStats {
  [language: string]: {
    size: number;
    percentage: number;
  };
}

export interface GitHubStats {
  totalRepos: number;
  totalStars: number;
  totalForks: number;
  totalContributions: number;
  currentStreak: number;
  longestStreak: number;
  languageStats: GitHubLanguageStats;
}
