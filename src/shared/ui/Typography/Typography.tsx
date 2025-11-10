// src/shared/ui/Typography/Typography.tsx
import React from 'react';
import styles from './Typography.module.scss';

export interface TypographyProps {
  variant?: 'h1' | 'h2' | 'h3' | 'body' | 'caption';
  children: React.ReactNode;
  className?: string;
  color?: 'primary' | 'secondary' | 'accent';
}

export const Typography: React.FC<TypographyProps> = ({
  variant = 'body',
  children,
  className = '',
  color = 'primary'
}) => {
  const Component = variant === 'body' ? 'p' : variant;
  
  return (
    <Component 
      className={`${styles.typography} ${styles[variant]} ${styles[color]} ${className}`}
    >
      {children}
    </Component>
  );
};