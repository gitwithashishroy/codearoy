import { GitHubStats, LeetCodeStats } from '@/types/github';
import { DevProfile } from '@/types/github';
import { fetchGitHubStats as fetchRealGitHubStats } from './api/github-api';

const MOCK_GITHUB: GitHubStats = {
  username: 'octocat',
  totalRepos: 42,
  totalStars: 1250,
  totalCommits: 3500,
  followers: 820,
  topLanguages: [
    { name: 'TypeScript', percentage: 45, color: '#3178c6' },
    { name: 'React', percentage: 30, color: '#61dbfb' },
    { name: 'Node.js', percentage: 15, color: '#339933' },
    { name: 'Rust', percentage: 10, color: '#dea584' },
  ],
  recentRepos: [
    {
      name: 'next-saas-starter',
      description: 'A high-performance SAAS boilerplate',
      stars: 450,
      language: 'TypeScript',
    },
    {
      name: 'ui-components-lib',
      description: 'Design system for React apps',
      stars: 320,
      language: 'TypeScript',
    },
    {
      name: 'rust-worker-engine',
      description: 'High throughput data processor',
      stars: 120,
      language: 'Rust',
    },
  ],
};

const MOCK_LEETCODE: LeetCodeStats = {
  username: 'coder_pro',
  solved: { total: 452, easy: 120, medium: 280, hard: 52 },
  ranking: 'Top 2%',
  contestRating: 1950,
  badges: ['Guardian', 'Knight', '50 Days Badge'],
  submissionCalendar: Array.from({ length: 15 }, (_, i) => ({
    date: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toISOString(),
    count: Math.floor(Math.random() * 5),
  })),
};

export class DevService {
  static async getProfile(githubUsername: string, leetcodeUsername: string): Promise<DevProfile> {
    return {
      github: { ...MOCK_GITHUB, username: githubUsername || MOCK_GITHUB.username },
      leetcode: { ...MOCK_LEETCODE, username: leetcodeUsername || MOCK_LEETCODE.username },
    };
  }
}

export async function fetchGitHubStats(username: string): Promise<GitHubStats> {
  try {
    // Try to fetch real GitHub data
    const realData = await fetchRealGitHubStats(username);

    if (realData) {
      return realData;
    }

    // Fallback to mock data if API fails
    console.warn(`Failed to fetch real GitHub data for ${username}, using mock data`);
    return { ...MOCK_GITHUB, username };
  } catch (error) {
    console.error('Error in fetchGitHubStats:', error);
    return { ...MOCK_GITHUB, username };
  }
}

export async function fetchLeetCodeStats(username: string): Promise<LeetCodeStats> {
  const profile = await DevService.getProfile('octocat', username);
  return profile.leetcode;
}
