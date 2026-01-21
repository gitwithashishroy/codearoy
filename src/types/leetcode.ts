export interface LeetCodeSubmission {
  id: string;
  title: string;
  titleSlug: string;
  timestamp: number;
  statusDisplay: string;
  lang: string;
}

export interface LeetCodeStats {
  totalSolved: number;
  totalQuestions: number;
  easySolved: number;
  mediumSolved: number;
  hardSolved: number;
  acceptanceRate: number;
  ranking: number;
  contributionPoints: number;
  reputation: number;
}

export interface LeetCodeLanguageStats {
  languageName: string;
  problemsSolved: number;
}

export interface LeetCodeBadge {
  id: string;
  name: string;
  icon: string;
}
