import React from 'react';
import styles from './Container.module.scss';

interface ContainerProps {
  children: React.ReactNode;
  variant?: 'default' | 'fluid' | 'narrow';
  className?: string;
}

export default function Container({
  children,
  variant = 'default',
  className = '',
}: ContainerProps) {
  const containerClass =
    variant === 'fluid'
      ? styles.containerFluid
      : variant === 'narrow'
        ? styles.containerNarrow
        : styles.container;

  return <div className={`${containerClass} ${className}`}>{children}</div>;
}
