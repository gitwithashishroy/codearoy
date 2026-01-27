import { Container, Section } from '@/components/ui';
import { GitHubCard } from '@/features/homepage/sections/CodingProfile/github/GithubCard';
import { getLeetCodeStats } from '@/features/homepage/sections/CodingProfile/leetcode/action';
import styles from './CodingProfile.module.scss';
import { fetchGitHubStats } from '@/features/homepage/sections/CodingProfile/github/api/github-api';
import Stats from './Stats/Stats';

export const CodingProfile: React.FC = async () => {
  const [githubStats, leetcodeStats] = await Promise.all([
    fetchGitHubStats('gitwithashishroy'),
    getLeetCodeStats(),
  ]);

  const showLeetCodeCard = false;

  if (!githubStats && !showLeetCodeCard) {
    return null; // Don't render the section if no data is available
  }

  return (
    <Section id="github">
      <Container>
        <div className={styles.codingProfile}>
          {githubStats && <GitHubCard stats={githubStats} />}
          <Stats />
        </div>
      </Container>
    </Section>
  );
};

export default CodingProfile;
