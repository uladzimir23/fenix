// src/shared/ui/Icon/Icon.tsx
import React from 'react';
import { IconType } from 'react-icons';
import styles from './Icon.module.scss';

export interface IconProps {
  icon: IconType;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  onClick?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

export const Icon: React.FC<IconProps> = ({
  icon: IconComponent,
  size = 'md',
  className = '',
  onClick,
  onMouseEnter,
  onMouseLeave
}) => {
  return (
    <IconComponent
      className={`${styles.icon} ${styles[size]} ${className}`}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    />
  );
};