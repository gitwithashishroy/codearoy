import React from 'react';
import Container from '@/components/ui/Container/Container';
import Section from '@/components/ui/Section/Section';
import Card from '@/components/ui/Card/Card';
import { getLeetCodeStats, getRecentSubmissions } from '@/features/leetcode/action';
import styles from './page.module.scss';

export default async function DSAPage() {
  const stats = await getLeetCodeStats();
  const recentSubmissions = await getRecentSubmissions();

  return (
    <>
      <div className={styles.dsaHeader}>
        <Container>
          <h1 className={styles.dsaTitle}>DSA Progress</h1>
          <p>LeetCode journey and problem-solving statistics</p>
        </Container>
      </div>

      <Container>
        <Section>
          <div className={styles.statsOverview}>
            <div className={styles.statBox}>
              <div className={styles.statNumber}>{stats.totalSolved}</div>
              <div className={styles.statLabel}>Problems Solved</div>
            </div>
            <div className={styles.statBox}>
              <div className={styles.statNumber}>{stats.acceptanceRate}%</div>
              <div className={styles.statLabel}>Acceptance Rate</div>
            </div>
            <div className={styles.statBox}>
              <div className={styles.statNumber}>{stats.ranking.toLocaleString()}</div>
              <div className={styles.statLabel}>Global Ranking</div>
            </div>
            <div className={styles.statBox}>
              <div className={styles.statNumber}>{stats.contributionPoints}</div>
              <div className={styles.statLabel}>Contribution Points</div>
            </div>
          </div>
        </Section>

        <Section title="By Difficulty">
          <div className={styles.difficultyCards}>
            <Card>
              <div className={styles.difficultyCard}>
                <div className={`${styles.difficultyName} ${styles.difficultyEasy}`}>Easy</div>
                <div className={`${styles.progressCircle} ${styles.progressCircleEasy}`}>
                  {stats.easySolved}
                </div>
                <div className={styles.statLabel}>Problems Solved</div>
              </div>
            </Card>

            <Card>
              <div className={styles.difficultyCard}>
                <div className={`${styles.difficultyName} ${styles.difficultyMedium}`}>Medium</div>
                <div className={`${styles.progressCircle} ${styles.progressCircleMedium}`}>
                  {stats.mediumSolved}
                </div>
                <div className={styles.statLabel}>Problems Solved</div>
              </div>
            </Card>

            <Card>
              <div className={styles.difficultyCard}>
                <div className={`${styles.difficultyName} ${styles.difficultyHard}`}>Hard</div>
                <div className={`${styles.progressCircle} ${styles.progressCircleHard}`}>
                  {stats.hardSolved}
                </div>
                <div className={styles.statLabel}>Problems Solved</div>
              </div>
            </Card>
          </div>
        </Section>

        <Section title="Recent Submissions">
          <div className={styles.submissionsList}>
            {recentSubmissions.map((submission) => (
              <div key={submission.id} className={styles.submissionItem}>
                <div className={styles.submissionTitle}>{submission.title}</div>
                <div className={styles.submissionMeta}>
                  <span className={styles.submissionStatus}>{submission.statusDisplay}</span>
                  <span>{submission.lang}</span>
                  <span>{new Date(submission.timestamp).toLocaleDateString()}</span>
                </div>
              </div>
            ))}
          </div>
        </Section>
      </Container>
    </>
  );
}
