import React from 'react';
import styles from './GithubCard.module.scss';
import { Icons } from '@/components/Constant';
import { StatsCard, ContributionGraph, WeeklyActivity } from './components';
import { GitHubStats } from './github.types';

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

      <div className={styles.ghStatsContainer}>
        <div className={styles.ghContributionGraphGrid}>
          <ContributionGraph
            totalCommits={stats.totalCommits}
            contributions={stats.contributions}
          />
        </div>
        <div className={styles.ghStatsGrid}>
          <StatsCard totalStars={stats.totalStars} totalCommits={stats.totalCommits} />
          <WeeklyActivity />
        </div>
      </div>
    </div>
  );
};
