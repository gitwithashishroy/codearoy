import React from 'react';
import Container from '@/components/ui/Container/Container';
import Section from '@/components/ui/Section/Section';
import Card from '@/components/ui/Card/Card';
import Button from '@/components/ui/Button/Button';
import { getPinnedRepos, getGitHubStats } from '@/features/github/action';
import styles from './page.module.scss';

export default async function GitHubPage() {
  const repos = await getPinnedRepos();
  const stats = await getGitHubStats();

  return (
    <>
      <div className={styles.githubHeader}>
        <Container>
          <h1 className={styles.githubTitle}>GitHub Activity</h1>
          <p>My open source contributions and projects</p>
        </Container>
      </div>

      <Container>
        <Section>
          <div className={styles.statsGrid}>
            <Card className={styles.statCard}>
              <div className={styles.statValue}>{stats.totalRepos}</div>
              <div className={styles.statLabel}>Public Repositories</div>
            </Card>
            <Card className={styles.statCard}>
              <div className={styles.statValue}>{stats.totalStars}</div>
              <div className={styles.statLabel}>Total Stars</div>
            </Card>
            <Card className={styles.statCard}>
              <div className={styles.statValue}>{stats.totalForks}</div>
              <div className={styles.statLabel}>Total Forks</div>
            </Card>
            <Card className={styles.statCard}>
              <div className={styles.statValue}>{stats.totalContributions}</div>
              <div className={styles.statLabel}>Contributions (2026)</div>
            </Card>
            <Card className={styles.statCard}>
              <div className={styles.statValue}>{stats.currentStreak}</div>
              <div className={styles.statLabel}>Current Streak</div>
            </Card>
            <Card className={styles.statCard}>
              <div className={styles.statValue}>{stats.longestStreak}</div>
              <div className={styles.statLabel}>Longest Streak</div>
            </Card>
          </div>
        </Section>

        <Section title="Pinned Repositories">
          <div className={styles.reposGrid}>
            {repos.map((repo) => (
              <Card key={repo.id} className={styles.repoCard}>
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.repoName}
                >
                  {repo.name}
                </a>
                <p className={styles.repoDescription}>{repo.description}</p>
                <div className={styles.repoStats}>
                  <span className={styles.repoStat}>⭐ {repo.stargazers_count}</span>
                  <span className={styles.repoStat}>🔀 {repo.forks_count}</span>
                </div>
                <span className={styles.repoLanguage}>{repo.language}</span>
              </Card>
            ))}
          </div>
        </Section>

        <Section title="Language Statistics">
          <Card>
            <div className={styles.languagesGrid}>
              {Object.entries(stats.languageStats).map(([language, data]) => (
                <div key={language} className={styles.languageItem}>
                  <div className={styles.languageHeader}>
                    <span className={styles.languageName}>{language}</span>
                    <span className={styles.languagePercentage}>{data.percentage.toFixed(1)}%</span>
                  </div>
                  <div className={styles.languageBar}>
                    <div
                      className={styles.languageBarFill}
                      style={{ width: `${data.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </Section>

        <Section>
          <div style={{ textAlign: 'center' }}>
            <Button href="https://github.com/gitwithashishroy" size="large">
              View Full Profile on GitHub
            </Button>
          </div>
        </Section>
      </Container>
    </>
  );
}
