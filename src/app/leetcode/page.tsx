import { getLeetCodeStats } from '@/features/leetcode/action';
import { Dashboard } from '@/features/leetcode/Dashboard';

export default async function LeetCodePage() {
  const stats = await getLeetCodeStats();
  return <Dashboard stats={stats} />;
}
