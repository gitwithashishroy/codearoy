'use client';

import React, { useMemo, useState } from 'react';
import styles from './ContributionGraph.module.scss';

interface ContributionGraphProps {
  totalCommits: number;
  contributions?: Array<{ date: string; contributionCount: number; color: string }>;
}

interface DayData {
  date: Date;
  level: number;
  count: number;
}

export const ContributionGraph: React.FC<ContributionGraphProps> = ({ contributions }) => {
  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState(2025);

  // Generate available years (current year and 4 previous years)
  const availableYears = useMemo(() => {
    return Array.from({ length: 5 }, (_, i) => currentYear - i);
  }, [currentYear]);

  // Generate weeks data with actual dates
  const { weeksData, monthPositions } = useMemo(() => {
    // Start from first Sunday of the year (or last Sunday of previous year)
    const yearStart = new Date(selectedYear, 0, 1);
    const firstDay = yearStart.getDay(); // 0 = Sunday, 6 = Saturday

    // Calculate the starting date (go back to previous Sunday if needed)
    const startDate = new Date(yearStart);
    startDate.setDate(yearStart.getDate() - firstDay);

    // End date is always December 31st of the selected year (show full year including future)
    const yearEnd = new Date(selectedYear, 11, 31);
    const lastDay = yearEnd.getDay();
    const endDate = new Date(yearEnd);
    endDate.setDate(yearEnd.getDate() + (6 - lastDay));

    // Create contribution map from real data
    const contributionMap = new Map<string, number>();
    if (contributions) {
      contributions.forEach((c) => {
        // Parse date in UTC to avoid timezone issues
        const dateStr = c.date.split('T')[0]; // Get YYYY-MM-DD
        const [year, month, day] = dateStr.split('-').map(Number);
        const date = new Date(Date.UTC(year, month - 1, day));
        if (date.getUTCFullYear() === selectedYear) {
          contributionMap.set(dateStr, c.contributionCount);
        }
      });
    }

    // Generate weeks array (each week has 7 days)
    const weeks: DayData[][] = [];
    const monthPos: Array<{ month: string; weekIndex: number }> = [];
    let currentMonth = -1;

    let currentDate = new Date(startDate);
    while (currentDate <= endDate) {
      const week: DayData[] = [];

      for (let day = 0; day < 7; day++) {
        // Create date string in local timezone format YYYY-MM-DD
        const year = currentDate.getFullYear();
        const monthNum = String(currentDate.getMonth() + 1).padStart(2, '0');
        const dayNum = String(currentDate.getDate()).padStart(2, '0');
        const dateStr = `${year}-${monthNum}-${dayNum}`;
        const isInYear = currentDate.getFullYear() === selectedYear;
        const isFuture = currentDate > new Date();

        let count = 0;
        let level = 0;

        if (isInYear && !isFuture) {
          if (contributionMap.has(dateStr)) {
            count = contributionMap.get(dateStr)!;
            // Convert to level
            if (count === 0) level = 0;
            else if (count <= 2) level = 1;
            else if (count <= 4) level = 2;
            else if (count <= 6) level = 3;
            else level = 4;
          }
          // If date is not in contribution map, leave it as 0 (no contributions)
        }

        week.push({
          date: new Date(currentDate),
          level: isInYear ? level : 0,
          count,
        });

        // Track month changes for labels
        const currentMonthNum = currentDate.getMonth();
        if (currentMonthNum !== currentMonth && day === 0 && isInYear) {
          currentMonth = currentMonthNum;
          monthPos.push({
            month: currentDate.toLocaleDateString('en-US', { month: 'short' }),
            weekIndex: weeks.length,
          });
        }

        currentDate.setDate(currentDate.getDate() + 1);
      }

      weeks.push(week);
    }

    return { weeksData: weeks, monthPositions: monthPos };
  }, [selectedYear, contributions, currentYear]);

  // Calculate commits for selected year (only count actual contributions, not future dates)
  const yearCommits = useMemo(() => {
    const today = new Date();
    today.setHours(23, 59, 59, 999); // End of today
    return weeksData.reduce((sum, week) => {
      return (
        sum +
        week.reduce((weekSum, day) => {
          // Only count if date is in selected year and not in the future
          if (day.date.getFullYear() === selectedYear && day.date <= today) {
            return weekSum + day.count;
          }
          return weekSum;
        }, 0)
      );
    }, 0);
  }, [weeksData, selectedYear]);

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
        <div
          className={styles.ghMonthLabels}
          style={{ gridTemplateColumns: `repeat(${weeksData.length}, minmax(0.625rem, 1fr))` }}
        >
          {monthPositions.map(({ month, weekIndex }) => (
            <span key={`${month}-${weekIndex}`} style={{ gridColumn: `${weekIndex + 1} / span 1` }}>
              {month}
            </span>
          ))}
        </div>

        <div className={styles.ghHeatmapContainer}>
          {/* Day labels */}
          <div className={styles.ghDayLabels}>
            <span>Sun</span>
            <span>Mon</span>
            <span>Tue</span>
            <span>Wed</span>
            <span>Thu</span>
            <span>Fri</span>
            <span>Sat</span>
          </div>

          {/* Contribution grid - organized by weeks */}
          <div
            className={styles.ghHeatmapGrid}
            style={{ gridTemplateColumns: `repeat(${weeksData.length}, minmax(0.625rem, 1fr))` }}
          >
            {weeksData.map((week, weekIdx) =>
              week.map((day, dayIdx) => (
                <div
                  key={`${weekIdx}-${dayIdx}`}
                  className={`${styles.ghHeatSquare} ${styles[`ghHeatL${day.level}`]}`}
                  title={`${day.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}: ${day.count} contributions`}
                  style={{
                    gridColumn: weekIdx + 1,
                    gridRow: dayIdx + 1,
                  }}
                />
              ))
            )}
          </div>
        </div>

        {/* Footer - sticky at bottom */}
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
