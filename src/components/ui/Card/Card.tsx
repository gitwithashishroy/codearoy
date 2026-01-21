import React from 'react';
import styles from './Card.module.scss';

interface CardProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  footer?: React.ReactNode;
  onClick?: () => void;
  variant?: 'default' | 'flat' | 'elevated';
  className?: string;
}

export default function Card({
  children,
  title,
  subtitle,
  footer,
  onClick,
  variant = 'default',
  className = '',
}: CardProps) {
  const cardClasses = [
    styles.card,
    onClick ? styles.cardClickable : '',
    variant === 'flat' ? styles.cardFlat : '',
    variant === 'elevated' ? styles.cardElevated : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={cardClasses} onClick={onClick}>
      {(title || subtitle) && (
        <div className={styles.cardHeader}>
          {title && <h3 className={styles.cardTitle}>{title}</h3>}
          {subtitle && <p className={styles.cardSubtitle}>{subtitle}</p>}
        </div>
      )}
      <div className={styles.cardContent}>{children}</div>
      {footer && <div className={styles.cardFooter}>{footer}</div>}
    </div>
  );
}
