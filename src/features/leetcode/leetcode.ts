export interface Solution {
  filePath: string;
  problem: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  topic: string | string[];
  language: string;
  timeComplexity: string;
  spaceComplexity: string;
  date: string;
  leetcodeUrl: string;
}

export interface LeetCodeStats {
  totalSolved: number;
  lastUpdated: string;
  byDifficulty: Record<string, number>;
  byLanguage: Record<string, number>;
  byTopic: Record<string, number>;
  solutions: Solution[];
  streak: {
    current: number;
    longest: number;
  };
  // Optional fields - add to stats.json when available
  username?: string;
  ranking?: string; // e.g., "Top 5%"
  contestRating?: number; // e.g., 1650
  badges?: string[]; // e.g., ["Guardian", "Knight", "50 Days Badge"]
  submissionCalendar?: Array<{ date: string; count: number }>;
}
