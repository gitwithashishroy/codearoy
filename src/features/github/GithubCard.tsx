import React from 'react';
import styles from './GithubCard.module.scss';
import { GitHubStats } from '@/types/github';
import { Icons } from '@/components/Constant';
import { StatsCard, ContributionGraph, WeeklyActivity } from './components';

interface GitHubCardProps {
  stats: GitHubStats;
}

export const GitHubCard: React.FC<GitHubCardProps> = async ({ stats }) => {
  return (
    <div className={styles.ghCard}>
      <div className={styles.ghHeader}>
        <div className={styles.ghProfileInfo}>
          <div className={styles.ghIconBox}>
            <Icons.GitHub />
          </div>
          <div>
            <h3>GitHub Profile</h3>
            <p>@{stats?.username}</p>
          </div>
        </div>
        <a
          href={`https://github.com/${stats?.username}`}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.ghExternalLink}
        >
          View Profile
        </a>
      </div>

      <StatsCard totalStars={stats.totalStars} totalCommits={stats.totalCommits} />

      <ContributionGraph totalCommits={stats.totalCommits} contributions={stats.contributions} />

      <WeeklyActivity />
    </div>
  );
};
