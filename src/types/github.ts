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
    url?: string;
  }>;
  contributions?: Array<{ date: string; contributionCount: number; color: string }>;
}

export interface LeetCodeStats {
  username: string;
  solved: {
    total: number;
    easy: number;
    medium: number;
    hard: number;
  };
  ranking: string;
  contestRating: number;
  badges: string[];
  submissionCalendar: Array<{ date: string; count: number }>;
}

export interface DevProfile {
  github: GitHubStats;
  leetcode: LeetCodeStats;
  aiSummary?: string;
}
