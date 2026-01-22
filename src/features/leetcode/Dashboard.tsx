'use client';

import { LeetCodeStats } from '@/types/leetcode';
import styles from './Dashboard.module.scss';
import Link from 'next/link';

export function Dashboard({ stats }: { stats: LeetCodeStats }) {
  // Calculate top language and active focus
  const topLanguage = Object.entries(stats.byLanguage).sort((a, b) => b[1] - a[1])[0]?.[0] || 'N/A';
  const activeFocus = Object.entries(stats.byTopic).sort((a, b) => b[1] - a[1])[0]?.[0] || 'N/A';

  return (
    <div className={styles.dashboard}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <div className={styles.logo}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M13 3L4 14h7l-1 7 9-11h-7l1-7z" fill="currentColor" />
            </svg>
            <span>ALGORITHMS PORTFOLIO</span>
          </div>
          <h1 className={styles.title}>
            CodeAroy <span className={styles.titleHighlight}>Dashboard</span>
          </h1>
        </div>
        <div className={styles.headerRight}>
          <div className={styles.lastSync}>
            <div className={styles.syncLabel}>LAST SYNC</div>
            <div className={styles.syncDate}>
              {new Date(stats.lastUpdated).toLocaleDateString('en-GB')}
            </div>
          </div>
          <Link href="/" className={styles.portfolioButton}>
            Portfolio
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M6 12l4-4-4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </Link>
        </div>
      </header>

      {/* Stat Cards */}
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statIcon} style={{ color: '#10b981' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
                fill="currentColor"
              />
            </svg>
          </div>
          <div className={styles.statContent}>
            <div className={styles.statLabel}>Total Solved</div>
            <div className={styles.statValue}>{stats.totalSolved}</div>
          </div>
          <div className={styles.statBadge}>+1 this week</div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIcon} style={{ color: '#ef4444' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 2C12 2 7 6 7 12C7 15.31 9.69 18 13 18C16.31 18 19 15.31 19 12C19 6 14 2 14 2H12Z"
                fill="currentColor"
              />
            </svg>
          </div>
          <div className={styles.statContent}>
            <div className={styles.statLabel}>Current Streak</div>
            <div className={styles.statValue}>{stats.streak.current} Days</div>
          </div>
          <div className={styles.statBadge}>Active</div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIcon} style={{ color: '#3b82f6' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="3" fill="currentColor" />
              <path d="M12 1v6m0 6v6M1 12h6m6 0h6" stroke="currentColor" strokeWidth="2" />
            </svg>
          </div>
          <div className={styles.statContent}>
            <div className={styles.statLabel}>Top Language</div>
            <div className={styles.statValue}>{topLanguage}</div>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIcon} style={{ color: '#fbbf24' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" fill="currentColor" />
            </svg>
          </div>
          <div className={styles.statContent}>
            <div className={styles.statLabel}>Active Focus</div>
            <div className={styles.statValue}>{activeFocus}</div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className={styles.chartsGrid}>
        {/* Difficulty Balance Chart */}
        <div className={styles.chartCard}>
          <h3 className={styles.chartTitle}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M2 10h16M10 2v16" stroke="currentColor" strokeWidth="2" />
            </svg>
            Difficulty Balance
          </h3>
          <div className={styles.difficultyChart}>
            <DifficultyDonut stats={stats.byDifficulty} />
            <div className={styles.difficultyLegend}>
              <div className={styles.legendItem}>
                <span className={styles.legendLabel}>EASY</span>
                <span className={styles.legendValue}>{stats.byDifficulty.Easy || 0}</span>
              </div>
              <div className={styles.legendItem}>
                <span className={styles.legendLabel}>MEDIUM</span>
                <span className={styles.legendValue}>{stats.byDifficulty.Medium || 0}</span>
              </div>
              <div className={styles.legendItem}>
                <span className={styles.legendLabel}>HARD</span>
                <span className={styles.legendValue}>{stats.byDifficulty.Hard || 0}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Topic Distribution Chart */}
        <div className={styles.chartCard}>
          <h3 className={styles.chartTitle}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M2 18L8 6L12 14L18 2" stroke="currentColor" strokeWidth="2" fill="none" />
            </svg>
            Topic Distribution
          </h3>
          <div className={styles.topicChart}>
            <TopicBarChart topics={stats.byTopic} />
          </div>
        </div>
      </div>

      {/* Recent Solutions */}
      <div className={styles.solutionsSection}>
        <div className={styles.solutionsHeader}>
          <h3>Recent Solutions</h3>
          <span className={styles.autoSync}>Auto-synchronized</span>
        </div>
        <div className={styles.solutionsTable}>
          <div className={styles.tableHeader}>
            <div className={styles.colProblem}>PROBLEM</div>
            <div className={styles.colDifficulty}>DIFFICULTY</div>
            <div className={styles.colTopic}>TOPIC</div>
            <div className={styles.colComplexity}>COMPLEXITY</div>
            <div className={styles.colDate}>DATE</div>
          </div>
          {stats.solutions.map((solution, index) => (
            <div key={index} className={styles.tableRow}>
              <div className={styles.colProblem}>
                <div className={styles.problemName}>{solution.problem}</div>
                <div className={styles.problemLanguage}>{solution.language}</div>
              </div>
              <div className={styles.colDifficulty}>
                <span
                  className={`${styles.difficultyBadge} ${styles[solution.difficulty.toLowerCase()]}`}
                >
                  {solution.difficulty}
                </span>
              </div>
              <div className={styles.colTopic}>
                {Array.isArray(solution.topic) ? solution.topic.join(', ') : solution.topic}
              </div>
              <div className={styles.colComplexity}>
                <div className={styles.complexityItem}>
                  T: <span>{solution.timeComplexity}</span>
                </div>
                <div className={styles.complexityItem}>
                  S: <span>{solution.spaceComplexity}</span>
                </div>
              </div>
              <div className={styles.colDate}>
                {new Date(solution.date).toLocaleDateString('en-CA')}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Difficulty Donut Chart Component
function DifficultyDonut({ stats }: { stats: Record<string, number> }) {
  const total = Object.values(stats).reduce((sum, val) => sum + val, 0);
  const easy = stats.Easy || 0;
  const medium = stats.Medium || 0;
  const hard = stats.Hard || 0;

  // Calculate percentages for SVG circle
  const easyPercent = total > 0 ? (easy / total) * 100 : 0;
  const mediumPercent = total > 0 ? (medium / total) * 100 : 0;
  const hardPercent = total > 0 ? (hard / total) * 100 : 0;

  const radius = 70;
  const circumference = 2 * Math.PI * radius;

  // Calculate dash offsets
  const easyDash = (easyPercent / 100) * circumference;
  const mediumDash = (mediumPercent / 100) * circumference;
  const hardDash = (hardPercent / 100) * circumference;

  return (
    <svg className={styles.donutSvg} viewBox="0 0 200 200">
      {/* Background circle */}
      <circle
        cx="100"
        cy="100"
        r={radius}
        fill="none"
        stroke="rgba(148, 163, 184, 0.1)"
        strokeWidth="20"
      />
      {/* Easy segment */}
      <circle
        cx="100"
        cy="100"
        r={radius}
        fill="none"
        stroke="#10b981"
        strokeWidth="20"
        strokeDasharray={`${easyDash} ${circumference - easyDash}`}
        strokeDashoffset={circumference / 4}
        transform="rotate(-90 100 100)"
      />
      {/* Medium segment */}
      {mediumPercent > 0 && (
        <circle
          cx="100"
          cy="100"
          r={radius}
          fill="none"
          stroke="#f59e0b"
          strokeWidth="20"
          strokeDasharray={`${mediumDash} ${circumference - mediumDash}`}
          strokeDashoffset={circumference / 4 - easyDash}
          transform="rotate(-90 100 100)"
        />
      )}
      {/* Hard segment */}
      {hardPercent > 0 && (
        <circle
          cx="100"
          cy="100"
          r={radius}
          fill="none"
          stroke="#ef4444"
          strokeWidth="20"
          strokeDasharray={`${hardDash} ${circumference - hardDash}`}
          strokeDashoffset={circumference / 4 - easyDash - mediumDash}
          transform="rotate(-90 100 100)"
        />
      )}
    </svg>
  );
}

// Topic Bar Chart Component
function TopicBarChart({ topics }: { topics: Record<string, number> }) {
  const maxValue = Math.max(...Object.values(topics), 1);

  return (
    <div className={styles.barChart}>
      <div className={styles.chartGrid}>
        <div className={styles.yAxis}>
          <span>1</span>
          <span>0.75</span>
          <span>0.5</span>
          <span>0.25</span>
          <span>0</span>
        </div>
        <div className={styles.bars}>
          {Object.entries(topics).map(([topic, count]) => (
            <div key={topic} className={styles.barWrapper}>
              <div className={styles.barContainer}>
                <div className={styles.bar} style={{ height: `${(count / maxValue) * 100}%` }} />
              </div>
              <div className={styles.barLabel}>{topic}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
