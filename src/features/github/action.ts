import { GitHubRepo, GitHubStats, GitHubLanguageStats } from '@/types/github';

// Mock data for development
const mockRepos: GitHubRepo[] = [
  {
    id: 1,
    name: 'portfolio-v2',
    description: 'Modern portfolio built with Next.js 14 and TypeScript',
    html_url: 'https://github.com/gitwithashishroy/portfolio-v2',
    language: 'TypeScript',
    stargazers_count: 42,
    forks_count: 8,
    topics: ['nextjs', 'typescript', 'portfolio', 'react'],
  },
  {
    id: 2,
    name: 'leetcode-solutions',
    description: 'Collection of LeetCode problems solved with detailed explanations',
    html_url: 'https://github.com/gitwithashishroy/leetcode-solutions',
    language: 'JavaScript',
    stargazers_count: 128,
    forks_count: 24,
    topics: ['leetcode', 'algorithms', 'data-structures'],
  },
  {
    id: 3,
    name: 'react-component-library',
    description: 'Reusable React components with TypeScript and Storybook',
    html_url: 'https://github.com/gitwithashishroy/react-component-library',
    language: 'TypeScript',
    stargazers_count: 89,
    forks_count: 15,
    topics: ['react', 'typescript', 'components', 'storybook'],
  },
];

const mockLanguageStats: GitHubLanguageStats = {
  TypeScript: { size: 156789, percentage: 45.2 },
  JavaScript: { size: 98234, percentage: 28.3 },
  SCSS: { size: 45678, percentage: 13.2 },
  Python: { size: 28901, percentage: 8.3 },
  HTML: { size: 17234, percentage: 5.0 },
};

const mockStats: GitHubStats = {
  totalRepos: 47,
  totalStars: 326,
  totalForks: 89,
  totalContributions: 1247,
  currentStreak: 23,
  longestStreak: 87,
  languageStats: mockLanguageStats,
};

export async function getPinnedRepos(): Promise<GitHubRepo[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));
  return mockRepos;
}

export async function getGitHubStats(): Promise<GitHubStats> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));
  return mockStats;
}

export async function getRecentActivity(): Promise<any[]> {
  // Placeholder for recent activity
  await new Promise((resolve) => setTimeout(resolve, 500));
  return [
    {
      id: '1',
      type: 'push',
      repo: 'portfolio-v2',
      message: 'Added new project showcase section',
      date: '2026-01-19',
    },
    {
      id: '2',
      type: 'star',
      repo: 'awesome-react-hooks',
      date: '2026-01-18',
    },
    {
      id: '3',
      type: 'pr',
      repo: 'open-source-project',
      message: 'Fix: Resolved accessibility issues in navigation',
      date: '2026-01-17',
    },
  ];
}
