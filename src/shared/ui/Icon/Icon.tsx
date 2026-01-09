// src/shared/ui/Icon/Icon.tsx
import React from 'react';
import { IconType } from 'react-icons';
import { css } from '@emotion/react';
import styled from '@emotion/styled';

export interface IconProps {
  icon: IconType;
  size?: 'sm' | 'md' | 'lg' | 'xl' | number; // Добавляем поддержку числовых размеров
  color?: string;
  className?: string;
  onClick?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

// Создаем стилизованный контейнер для иконки
const IconContainer = styled.div<{
  size?: 'sm' | 'md' | 'lg' | 'xl' | number;
  color?: string;
  clickable?: boolean;
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.color || 'currentColor'};
  transition: color 0.2s ease;
  
  ${props => {
    if (typeof props.size === 'number') {
      return css`
        font-size: ${props.size}px;
      `;
    }
    
    switch (props.size) {
      case 'sm': return css` font-size: 12px; `;
      case 'lg': return css` font-size: 16px; `;
      case 'xl': return css` font-size: 18px; `;
      case 'md':
      default: return css` font-size: 14px; `;
    }
  }}
  
  ${props => props.clickable && css`
    cursor: pointer;
    
    &:hover {
      opacity: 0.8;
    }
  `}
`;

export const Icon: React.FC<IconProps> = ({
  icon: IconComponent,
  size = 'md',
  color,
  className = '',
  onClick,
  onMouseEnter,
  onMouseLeave
}) => {
  return (
    <IconContainer
      size={size}
      color={color}
      clickable={!!onClick}
      className={className}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <IconComponent />
    </IconContainer>
  );
};

export default Icon;