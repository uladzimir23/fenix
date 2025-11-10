// src/features/car-filter/components/AnimatedCard/AnimatedCard.tsx
import React from 'react';
import { ContentCardProps } from '../../types/car-filter.types';
import styles from './AnimatedCard.module.scss';

export const AnimatedCard: React.FC<ContentCardProps> = ({ 
  children, 
  delay, 
  className = "", 
  onClick 
}) => {
  return (
    <div 
      className={`${styles.contentCard} ${className}`}
      style={{ animationDelay: `${delay}ms` }}
      onClick={onClick}
    >
      {children}
    </div>
  );
};