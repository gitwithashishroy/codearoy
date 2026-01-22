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
}
