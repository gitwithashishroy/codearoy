'use client';

import React, { useMemo, useState } from 'react';
import styles from './ContributionGraph.module.scss';

interface ContributionGraphProps {
  totalCommits: number;
  contributions?: Array<{ date: string; contributionCount: number; color: string }>;
}

export const ContributionGraph: React.FC<ContributionGraphProps> = ({
  totalCommits,
  contributions,
}) => {
  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState(currentYear);

  // Generate available years (current year and 4 previous years)
  const availableYears = useMemo(() => {
    return Array.from({ length: 5 }, (_, i) => currentYear - i);
  }, [currentYear]);

  // Helper function to generate seeded data for a specific year
  function generateSeededDataForYear(year: number) {
    const seededRandom = (seed: number) => {
      const x = Math.sin(seed) * 10000;
      return x - Math.floor(x);
    };

    // 53 columns (weeks) x 7 rows (days) = 371 squares (full year)
    return Array.from({ length: 371 }).map((_, i) => {
      // Use year as part of seed for different patterns per year
      const factor = Math.sin(i / 15) * 2 + seededRandom(i + 42 + year) * 5;
      if (factor < 1.5) return 0;
      if (factor < 3) return 1;
      if (factor < 4.5) return 2;
      if (factor < 6) return 3;
      return 4;
    });
  }

  // Generate contribution data from real data or fallback to seeded randomness
  const contributionData = useMemo(() => {
    if (contributions && contributions.length > 0) {
      // Filter contributions by selected year
      const yearContributions = contributions.filter((day) => {
        const year = new Date(day.date).getFullYear();
        return year === selectedYear;
      });

      // If no contributions for selected year, generate seeded data for that year
      if (yearContributions.length === 0) {
        return generateSeededDataForYear(selectedYear);
      }

      // Use real contribution data from GitHub GraphQL API
      // Convert to level-based system (0-4) for consistent styling
      return yearContributions.map((day) => {
        const count = day.contributionCount;
        if (count === 0) return 0;
        if (count <= 2) return 1;
        if (count <= 4) return 2;
        if (count <= 6) return 3;
        return 4;
      });
    }

    // Fallback: generate seeded data for selected year
    return generateSeededDataForYear(selectedYear);
  }, [contributions, selectedYear]);

  // Calculate commits for selected year
  const yearCommits = useMemo(() => {
    if (contributions && contributions.length > 0) {
      return contributions
        .filter((day) => new Date(day.date).getFullYear() === selectedYear)
        .reduce((sum, day) => sum + day.contributionCount, 0);
    }
    // Estimate for seeded data
    return Math.floor(totalCommits / 2);
  }, [contributions, selectedYear, totalCommits]);

  // Month labels for the contribution graph
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  return (
    <div className={styles.ghChartSection}>
      <div className={styles.ghContributionHeader}>
        <h4>
          {yearCommits.toLocaleString()} contributions in {selectedYear}
        </h4>
        <div className={styles.ghYearSelector}>
          {availableYears.map((year) => (
            <button
              key={year}
              onClick={() => setSelectedYear(year)}
              className={`${styles.ghYearButton} ${selectedYear === year ? styles.ghYearButtonActive : ''}`}
            >
              {year}
            </button>
          ))}
        </div>
      </div>
      <div className={styles.ghHeatmapWrapper}>
        {/* Month labels */}
        <div className={styles.ghMonthLabels}>
          {months.map((month, idx) => (
            <span key={month} style={{ gridColumn: `${Math.floor(idx * 4.4 + 1)} / span 4` }}>
              {month}
            </span>
          ))}
        </div>

        <div className={styles.ghHeatmapContainer}>
          {/* Day labels */}
          <div className={styles.ghDayLabels}>
            <span style={{ gridRow: '1' }}>Mon</span>
            <span style={{ gridRow: '3' }}>Wed</span>
            <span style={{ gridRow: '5' }}>Fri</span>
          </div>

          {/* Contribution grid */}
          <div className={styles.ghHeatmapGrid}>
            {contributionData.map((level, i) => (
              <div
                key={i}
                className={`${styles.ghHeatSquare} ${styles[`ghHeatL${level}`]}`}
                title={`Level ${level} contributions`}
              />
            ))}
          </div>
        </div>

        <div className={styles.ghHeatmapFooter}>
          <span>Less</span>
          <div className={`${styles.ghLegendItem} ${styles.ghHeatL0}`} />
          <div className={`${styles.ghLegendItem} ${styles.ghHeatL1}`} />
          <div className={`${styles.ghLegendItem} ${styles.ghHeatL2}`} />
          <div className={`${styles.ghLegendItem} ${styles.ghHeatL3}`} />
          <div className={`${styles.ghLegendItem} ${styles.ghHeatL4}`} />
          <span>More</span>
        </div>
      </div>
    </div>
  );
};
