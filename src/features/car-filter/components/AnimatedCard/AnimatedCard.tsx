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
  // Правильно обрабатываем классы для CSS Modules
  const baseClass = styles.contentCard;
  
  // Разбиваем переданные классы и мапим их на CSS Modules
  const additionalClasses = className
    .split(' ')
    .filter(Boolean)
    .map(cls => {
      // Преобразуем kebab-case в camelCase для доступа к свойствам styles
      const camelCaseClass = cls.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
      return styles[camelCaseClass] || cls;
    })
    .join(' ');

  const combinedClassName = `${baseClass} ${additionalClasses}`.trim();

  return (
    <div 
      className={combinedClassName}
      style={{ animationDelay: `${delay}ms` }}
      onClick={onClick}
    >
      {children}
    </div>
  );
};