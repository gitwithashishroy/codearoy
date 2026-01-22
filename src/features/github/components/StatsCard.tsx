'use client';

import React from 'react';
import styles from './StatsCard.module.scss';

interface StatsCardProps {
  totalStars: number;
  totalCommits: number;
}

export const StatsCard: React.FC<StatsCardProps> = ({ totalStars, totalCommits }) => {
  return (
    <div className={styles.ghMainStats}>
      <div className={styles.ghStatBox}>
        <label>Stars Earned</label>
        <div className={styles.ghStatValue}>{totalStars.toLocaleString()}</div>
      </div>
      <div className={styles.ghStatBox}>
        <label>Commits</label>
        <div className={styles.ghStatValue}>{totalCommits.toLocaleString()}</div>
      </div>
    </div>
  );
};
