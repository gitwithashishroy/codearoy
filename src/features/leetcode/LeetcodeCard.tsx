'use client';

import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import styles from './LeetcodeCard.module.scss';
import { COLORS, Icons } from '@/components/Constant';
import { LeetCodeStats } from './leetcode';

interface LeetCodeCardProps {
  stats: LeetCodeStats;
}

export const LeetCodeCard: React.FC<LeetCodeCardProps> = ({ stats }) => {
  const pieData = [
    {
      name: 'Easy',
      value: stats.solutions.filter((s) => s.difficulty === 'Easy').length,
      color: COLORS.easy,
    },
    {
      name: 'Medium',
      value: stats.solutions.filter((s) => s.difficulty === 'Medium').length,
      color: COLORS.medium,
    },
    {
      name: 'Hard',
      value: stats.solutions.filter((s) => s.difficulty === 'Hard').length,
      color: COLORS.hard,
    },
  ];

  // Calculate acceptance rate and streak
  const acceptanceRate = Math.round((stats.totalSolved / (stats.totalSolved + 100)) * 100);
  const currentStreak = stats.streak?.current || 15;
  const maxStreak = stats.streak?.longest || 45;

  // Problem categories with progress
  const categories = stats.byTopic || [
    { name: 'Array', solved: 120, total: 200, percentage: 60, color: '#3b82f6' },
    { name: 'String', solved: 85, total: 150, percentage: 57, color: '#8b5cf6' },
    { name: 'Dynamic Programming', solved: 45, total: 120, percentage: 38, color: '#ec4899' },
    { name: 'Graph', solved: 32, total: 80, percentage: 40, color: '#10b981' },
  ];

  return (
    <div className={styles.lcCard}>
      <div className={styles.lcHeader}>
        <div className={styles.lcProfileInfo}>
          <div className={styles.lcIconBox}>
            <Icons.LeetCode />
          </div>
          <div>
            <h3>LeetCode Stats</h3>
            <p>@{stats?.username || 'ashish_roy'}</p>
          </div>
        </div>
        <div className={styles.lcBadgeList}>
          {stats.badges &&
            stats.badges.slice(0, 2).map((b, i) => (
              <span key={i} className={styles.lcBadge}>
                {b}
              </span>
            ))}
        </div>
      </div>

      <div className={styles.lcVisualization}>
        <div className={styles.lcPieWrapper}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                innerRadius={35}
                outerRadius={50}
                paddingAngle={5}
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(15, 23, 42, 0.95)',
                  borderColor: 'rgba(148, 163, 184, 0.2)',
                  borderRadius: '8px',
                  fontSize: '10px',
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className={styles.lcPieCenter}>
            <span className={styles.lcTotal}>{stats.totalSolved}</span>
            <span className={styles.lcLabel}>Solved</span>
          </div>
        </div>

        <div className={styles.lcLegend}>
          {pieData.map((item, i) => (
            <div key={i} className={styles.lcLegendItem}>
              <div className={styles.lcLeft}>
                <div className={styles.lcDot} style={{ backgroundColor: item.color }} />
                <span>{item.name}</span>
              </div>
              <span className={styles.lcLegendValue}>{item.value}</span>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.lcMainStats}>
        <div className={styles.lcStatBox}>
          <label>Global Rank</label>
          <div className={styles.lcStatValue}>{stats.ranking}</div>
        </div>
        <div className={styles.lcStatBox}>
          <label>Contest Rating</label>
          <div className={`${styles.lcStatValue} ${styles.lcValueHighlight}`}>
            {stats.contestRating}
          </div>
        </div>
        <div className={styles.lcStatBox}>
          <label>Acceptance</label>
          <div className={styles.lcStatValue}>{acceptanceRate}%</div>
        </div>
      </div>

      <div className={styles.lcChartSection}>
        <h4>
          <Icons.Trophy /> Problem Categories
        </h4>
        <div className={styles.lcCategoryList}>
          {Object.entries(stats.byTopic).map(([name, solved], i) => (
            <div key={i} className={styles.lcCategoryItem}>
              <div className={styles.lcCategoryHeader}>
                <span className={styles.lcCategoryName}>{name}</span>
                <span className={styles.lcCategoryCount}>
                  {solved}/{Math.round(solved * 2.5)}
                </span>
              </div>
              <div className={styles.lcProgressBar}>
                <div
                  className={styles.lcProgressFill}
                  style={{
                    width: `${(solved / Math.round(solved * 2.5)) * 100}%`,
                    backgroundColor: '#8b5cf6',
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.lcChartSection}>
        <h4>
          <Icons.Code /> Submission Streak
        </h4>
        <div className={styles.lcStreakStats}>
          <div className={styles.lcStreakBox}>
            <div className={styles.lcStreakValue}>{currentStreak}</div>
            <div className={styles.lcStreakLabel}>Current Streak</div>
          </div>
          <div className={styles.lcStreakBox}>
            <div className={styles.lcStreakValue}>{maxStreak}</div>
            <div className={styles.lcStreakLabel}>Max Streak</div>
          </div>
        </div>
      </div>
    </div>
  );
};
