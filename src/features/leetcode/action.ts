import { LeetCodeStats, LeetCodeSubmission, LeetCodeLanguageStats } from '@/types/leetcode';

// Mock data for development
const mockStats: LeetCodeStats = {
  totalSolved: 347,
  totalQuestions: 2847,
  easySolved: 156,
  mediumSolved: 142,
  hardSolved: 49,
  acceptanceRate: 67.8,
  ranking: 125678,
  contributionPoints: 892,
  reputation: 1245,
};

const mockRecentSubmissions: LeetCodeSubmission[] = [
  {
    id: '1',
    title: 'Two Sum',
    titleSlug: 'two-sum',
    timestamp: Date.now() - 3600000,
    statusDisplay: 'Accepted',
    lang: 'typescript',
  },
  {
    id: '2',
    title: 'Binary Tree Inorder Traversal',
    titleSlug: 'binary-tree-inorder-traversal',
    timestamp: Date.now() - 7200000,
    statusDisplay: 'Accepted',
    lang: 'javascript',
  },
  {
    id: '3',
    title: 'Longest Palindromic Substring',
    titleSlug: 'longest-palindromic-substring',
    timestamp: Date.now() - 10800000,
    statusDisplay: 'Accepted',
    lang: 'typescript',
  },
];

const mockLanguageStats: LeetCodeLanguageStats[] = [
  { languageName: 'TypeScript', problemsSolved: 187 },
  { languageName: 'JavaScript', problemsSolved: 98 },
  { languageName: 'Python', problemsSolved: 62 },
];

export async function getLeetCodeStats(): Promise<LeetCodeStats> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));
  return mockStats;
}

export async function getRecentSubmissions(): Promise<LeetCodeSubmission[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));
  return mockRecentSubmissions;
}

export async function getLanguageStats(): Promise<LeetCodeLanguageStats[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));
  return mockLanguageStats;
}
