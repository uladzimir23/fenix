// src/shared/ui/Button/Button.tsx
import React from 'react';
import styles from './Button.module.scss';

export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  onClick,
  disabled = false,
  loading = false,
  className = '',
  type = 'button'
}) => {
  return (
    <button
      type={type}
      className={`
        ${styles.button} 
        ${styles[variant]} 
        ${styles[size]} 
        ${disabled ? styles.disabled : ''}
        ${loading ? styles.loading : ''}
        ${className}
      `}
      onClick={onClick}
      disabled={disabled || loading}
    >
      {loading && <div className={styles.spinner} />}
      {children}
    </button>
  );
};