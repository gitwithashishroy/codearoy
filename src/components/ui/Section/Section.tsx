import React from 'react';
import styles from './Section.module.scss';

interface SectionProps {
  children: React.ReactNode;
  size?: 'small' | 'default' | 'large';
  title?: string;
  subtitle?: string;
  id?: string;
  className?: string;
}

export default function Section({
  children,
  size = 'default',
  title,
  subtitle,
  id,
  className = '',
}: SectionProps) {
  const sectionClass =
    size === 'small'
      ? styles.sectionSmall
      : size === 'large'
        ? styles.sectionLarge
        : styles.section;

  return (
    <section id={id} className={`${sectionClass} ${className}`}>
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
