'use client';

import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import styles from './LeetcodeCard.module.scss';
import { LeetCodeStats } from '@/types/github';
import { COLORS, Icons } from '@/components/Constant';

interface LeetCodeCardProps {
  stats: LeetCodeStats;
}

export const LeetCodeCard: React.FC<LeetCodeCardProps> = ({ stats }) => {
  const pieData = [
    { name: 'Easy', value: stats.solved.easy, color: COLORS.easy },
    { name: 'Medium', value: stats.solved.medium, color: COLORS.medium },
    { name: 'Hard', value: stats.solved.hard, color: COLORS.hard },
  ];

  // Calculate acceptance rate and streak
  const acceptanceRate = Math.round((stats.solved.total / (stats.solved.total + 100)) * 100);
  const currentStreak = 15; // Mock data
  const maxStreak = 45; // Mock data

  // Problem categories with progress
  const categories = [
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
            <p>@{stats.username}</p>
          </div>
        </div>
        <div className={styles.lcBadgeList}>
          {stats.badges.slice(0, 2).map((b, i) => (
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
            <span className={styles.lcTotal}>{stats.solved.total}</span>
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
          {categories.map((cat, i) => (
            <div key={i} className={styles.lcCategoryItem}>
              <div className={styles.lcCategoryHeader}>
                <span className={styles.lcCategoryName}>{cat.name}</span>
                <span className={styles.lcCategoryCount}>
                  {cat.solved}/{cat.total}
                </span>
              </div>
              <div className={styles.lcProgressBar}>
                <div
                  className={styles.lcProgressFill}
                  style={{ width: `${cat.percentage}%`, backgroundColor: cat.color }}
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

      <div className={styles.lcChartSection}>
        <h4>
          <Icons.Calendar /> Recent Activity
        </h4>
        <div className={styles.lcActivityWrapper}>
          <div className={styles.lcHeatmap}>
            {Array.from({ length: 49 }).map((_, i) => {
              const intensity = Math.sin(i / 7) * 2 + Math.cos(i / 3);
              let bgColor = '#1a1a1e';
              if (intensity > 1.5) bgColor = 'rgba(255, 161, 22, 0.6)';
              else if (intensity > 0.5) bgColor = 'rgba(255, 161, 22, 0.4)';
              else if (intensity > -0.5) bgColor = 'rgba(255, 161, 22, 0.2)';
              else if (intensity > -1.5) bgColor = 'rgba(255, 161, 22, 0.1)';

              return (
                <div
                  key={i}
                  className={styles.lcHeatSquare}
                  style={{ backgroundColor: bgColor }}
                  title={`Activity level ${Math.floor(intensity + 2)}`}
                />
              );
            })}
          </div>
          <div className={styles.lcHeatmapFooter}>
            <span>Less</span>
            <div className={styles.lcHeatLegendItem} style={{ backgroundColor: '#1a1a1e' }} />
            <div
              className={styles.lcHeatLegendItem}
              style={{ backgroundColor: 'rgba(255, 161, 22, 0.2)' }}
            />
            <div
              className={styles.lcHeatLegendItem}
              style={{ backgroundColor: 'rgba(255, 161, 22, 0.4)' }}
            />
            <div
              className={styles.lcHeatLegendItem}
              style={{ backgroundColor: 'rgba(255, 161, 22, 0.6)' }}
            />
            <span>More</span>
          </div>
        </div>
      </div>
    </div>
  );
};
