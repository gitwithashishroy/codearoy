import React from 'react';
import Link from 'next/link';
import styles from './Button.module.scss';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'small' | 'default' | 'large';
  fullWidth?: boolean;
  disabled?: boolean;
  href?: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
}

export default function Button({
  children,
  variant = 'primary',
  size = 'default',
  fullWidth = false,
  disabled = false,
  href,
  onClick,
  type = 'button',
  className = '',
}: ButtonProps) {
  const buttonClasses = [
    styles.button,
    styles[`button-${variant}`],
    size !== 'default' ? styles[`button-${size}`] : '',
    fullWidth ? styles.buttonFull : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  if (href) {
    return (
      <Link href={href} className={buttonClasses}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={buttonClasses} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}
