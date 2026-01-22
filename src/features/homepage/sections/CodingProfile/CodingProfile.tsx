import { Container, Section } from '@/components/ui';
import { GitHubCard } from '@/features/github/GithubCard';
import { LeetCodeCard } from '@/features/leetcode/LeetcodeCard';
import { getLeetCodeStats } from '@/features/leetcode/action';
import styles from './CodingProfile.module.scss';
import { fetchGitHubStats } from '@/features/github/api/github-api';

export const CodingProfile: React.FC = async () => {
  const [githubStats, leetcodeStats] = await Promise.all([
    fetchGitHubStats('gitwithashishroy'),
    getLeetCodeStats(),
  ]);

  return (
    <Section>
      <Container>
        <div className={styles.codingProfile}>
          <div className={styles.githubCard}>
            {githubStats && <GitHubCard stats={githubStats} />}
          </div>
          <div className={styles.leetCodeCard}>
            {leetcodeStats && <LeetCodeCard stats={leetcodeStats} />}
          </div>
        </div>
      </Container>
    </Section>
  );
};

export default CodingProfile;
