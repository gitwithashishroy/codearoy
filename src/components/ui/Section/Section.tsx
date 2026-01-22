import React from 'react';
import styles from './Section.module.scss';

interface SectionProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  id?: string;
  className?: string;
}

export default function Section({ children, title, subtitle, id, className = '' }: SectionProps) {
  return (
    <section id={id} className={` ${styles.section} ${className}`}>
      {(title || subtitle) && (
        <div className={styles.sectionHeader}>
          {title && <h2 className={styles.sectionTitle}>{title}</h2>}
          {subtitle && <p className={styles.sectionSubtitle}>{subtitle}</p>}
        </div>
      )}
      {children}
    </section>
  );
}
