import { LeetCodeStats } from '@/types/leetcode';

export async function getLeetCodeStats(): Promise<LeetCodeStats> {
  const res = await fetch(
    'https://raw.githubusercontent.com/gitwithashishroy/leetcode-solutions/main/stats.json',
    { next: { revalidate: 3600 } } // ISR: 1 hour
  );

  if (!res.ok) {
    throw new Error('Failed to fetch LeetCode stats');
  }

  return res.json();
}
