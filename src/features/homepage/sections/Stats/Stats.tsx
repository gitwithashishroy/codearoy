import { PERSONAL_DETAILS } from '@/config/PERSONAL_DETAILS_CONFIG';
import styles from './Stats.module.scss';

export default function Stats() {
  const stats = PERSONAL_DETAILS.stats;
  return (
    <section className={styles.stats}>
      <div className={styles.statsGrid}>
        {/* GitHub Contributions */}
        <div className={styles.statCard}>
          <div className={styles.statHeader}>
            <div className={styles.icon}>
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </div>
            <span className={styles.badge}>+12%</span>
          </div>
          <div className={styles.statContent}>
            <div className={styles.value}>{stats.contributions}</div>
            <div className={styles.label}>Contributions this year</div>
          </div>
        </div>

        {/* Problems Solved */}
        <div className={styles.statCard}>
          <div className={styles.statHeader}>
            <div className={styles.icon}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                <path d="M9 12l2 2 4-4" />
              </svg>
            </div>
            <span className={`${styles.badge} ${styles.warning}`}>●</span>
          </div>
          <div className={styles.statContent}>
            <div className={styles.value}>{stats.problemsSolved}</div>
            <div className={styles.label}>Problems Solved</div>
          </div>
        </div>

        {/* Experience */}
        <div className={styles.statCard}>
          <div className={styles.statHeader}>
            <div className={styles.icon}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
          </div>
          <div className={styles.statContent}>
            <div className={styles.value}>{stats.years}</div>
            <div className={styles.label}>Professional Exp.</div>
          </div>
        </div>

        {/* Core Tech Stack */}
        <div className={styles.statCard}>
          <div className={styles.statHeader}>
            <div className={styles.techStackLabel}>Core Tech Stack</div>
          </div>
          <div className={styles.techStack}>
            {stats.coreTech.map((t) => (
              <div key={t.label} className={styles.techIcon}>
                {t.icon}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
