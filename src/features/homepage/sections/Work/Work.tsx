import React from 'react';
import Link from 'next/link';
import styles from './Work.module.scss';

export default function Work() {
  return (
    <section id="work" className={styles.work}>
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>Selected Work</h2>

        <div className={styles.workGrid}>
          {/* Project 1 */}
          <div className={styles.workItem}>
            <div className={styles.workImage}>
              <div className={styles.imagePlaceholder}>
                {/* Dashboard illustration placeholder */}
                <svg viewBox="0 0 200 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect
                    x="10"
                    y="10"
                    width="180"
                    height="100"
                    rx="8"
                    fill="rgba(96, 165, 250, 0.1)"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <rect
                    x="20"
                    y="20"
                    width="70"
                    height="40"
                    rx="4"
                    fill="rgba(96, 165, 250, 0.2)"
                  />
                  <rect
                    x="100"
                    y="20"
                    width="70"
                    height="40"
                    rx="4"
                    fill="rgba(96, 165, 250, 0.2)"
                  />
                  <rect
                    x="20"
                    y="65"
                    width="150"
                    height="35"
                    rx="4"
                    fill="rgba(96, 165, 250, 0.2)"
                  />
                </svg>
              </div>
              {/* Replace with actual image: <img src="/path-to-dashboard.png" alt="Analytics Dashboard" /> */}
            </div>

            <div className={styles.workContent}>
              <div className={styles.techBadges}>
                <span className={styles.techBadge}>React</span>
                <span className={styles.techBadge}>D3.js</span>
                <span className={styles.techBadge}>Redux Toolkit</span>
                <span className={styles.techBadge}>Node.js</span>
              </div>

              <h3 className={styles.workTitle}>E-Commerce Analytics Dashboard</h3>

              <p className={styles.workDescription}>
                Architected the frontend for a high-volume analytics platform handling 1M+ daily
                events. Implemented complex data visualizations using D3.js and optimized rendering
                performance, reducing bundle size by 40%.
              </p>

              <Link href="/projects/analytics-dashboard" className={styles.workLink}>
                View Case Study
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>

          {/* You can add more work items here following the same pattern */}
        </div>
      </div>
    </section>
  );
}
