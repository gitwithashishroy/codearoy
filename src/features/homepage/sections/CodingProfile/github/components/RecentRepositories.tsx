'use client';

import React from 'react';
import { Icons } from '@/components/Constant';
import styles from './RecentRepositories.module.scss';

interface Repository {
  name: string;
  description: string;
  stars: number;
  language: string;
  url?: string;
}

interface RecentRepositoriesProps {
  repos: Repository[];
}

export const RecentRepositories: React.FC<RecentRepositoriesProps> = ({ repos }) => {
  return (
    <div className={styles.ghRepoSection}>
      <h4>Recent Repositories</h4>
      <div className={styles.ghRepoList}>
        {repos.map((repo, i) => (
          <a
            key={i}
            href={repo.url || `#`}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.ghRepoItem}
          >
            <div className={styles.ghRepoTop}>
              <span className={styles.ghRepoName}>{repo.name}</span>
              <span className={styles.ghStars}>
                <Icons.Star style={{ color: '#eab308' }} /> {repo.stars}
              </span>
            </div>
            <p className={styles.ghRepoDesc}>{repo.description}</p>
          </a>
        ))}
      </div>
    </div>
  );
};
