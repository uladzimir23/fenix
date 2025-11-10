// src/features/car-filter/components/ContentGrid/ContentGrid.tsx
import React from 'react';

interface ContentGridProps {
  children: React.ReactNode;
  className?: string;
}

export const ContentGrid: React.FC<ContentGridProps> = ({
  children,
  className = ''
}) => {
  return (
    <div className={`content-grid ${className}`}>
      {children}
    </div>
  );
};