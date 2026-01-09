// src/shared/ui/Dropdown/styles/DropdownStyles.tsx
import { css, keyframes } from '@emotion/react';
import styled from '@emotion/styled';

export const slideInUp = keyframes`
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

// src/shared/ui/Dropdown/styles/DropdownStyles.tsx
// Добавляем к существующим стилям:

export const DisabledDropdownContainer = styled.div`
  position: relative;
  width: 100%;
  background: var(--bg-secondary);
  border-radius: 10px;
  cursor: not-allowed;
  transition: all 0.3s ease;
  overflow: visible;
  border: 2px solid transparent;
  transform: translateY(-1px);
  opacity: 0.6;

  &:hover {
    background: var(--bg-secondary);
    border-color: transparent;
  }
`;

export const DisabledDropdownHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 15px;
  border-radius: 10px;
  background: transparent;
  color: var(--text-thirdly);
  transition: all 0.3s ease;
  min-height: 44px;
  box-sizing: border-box;
`;

export const DependencyMessage = styled.div`
  font-size: 11px;
  color: var(--text-thirdly);
  font-style: italic;
  margin-top: 4px;
  padding: 0 4px;
`;

// Базовые стили
export const DropdownContainer = styled.div<{
  isOpen?: boolean;
  isHovered?: boolean;
  isRemoveHovered?: boolean;
  disabled?: boolean;
}>`
  position: relative;
  width: 100%;
  background: var(--bg-secondary);
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
  overflow: visible;
  border: 2px solid transparent;
  transform: translateY(-1px);

  ${props => props.isHovered && !props.disabled && css`
    background: var(--bg-fourthly);
  `}

  ${props => props.isRemoveHovered && css`
    border-color: #ff444431 !important;
    background: transparent !important;
    scale: 0.998;
    border-radius: 14px;
  `}

  ${props => props.disabled && css`
    opacity: 0.6;
    cursor: not-allowed;
  `}

  ${props => props.isOpen && css`
    border-radius: 10px;
    z-index: 1000;
  `}
`;

export const DropdownHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 15px;
  border-radius: 10px;
  background: transparent;
  color: var(--text-primary);
  transition: all 0.3s ease;
  min-height: 44px;
  box-sizing: border-box;
`;

export const HeaderContent = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex: 1;
  min-width: 0;
`;

export const RemoveIconContainer = styled.div<{ 
  isRemoveHovered?: boolean;
  isHovered?: boolean;
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px;
  border-radius: 4px;
  transition: all 0.3s ease;
  margin-right: 7px;
  flex-shrink: 0;
  opacity: ${props => (props.isHovered || props.isRemoveHovered) ? 1 : 0.4};

  &:hover {
    color: #ff4444 !important;
    background: rgba(255, 68, 68, 0.1);
    border-radius: 8px;
    scale: 0.94;
  }
`;

export const SelectedValue = styled.span`
  font-size: 14px;
  color: var(--text-primary);
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const ChevronIcon = styled.div<{ 
  isOpen?: boolean;
  isHovered?: boolean;
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-primary);
  transition: all 0.3s ease;

  opacity: ${props => (props.isOpen || props.isHovered) ? 1 : 0.4};
  font-size: 14px;
  flex-shrink: 0;
  
  ${props => props.isOpen && css`
    transform: rotate(180deg);
  `}
`;

export const DropdownMenu = styled.div<{ 
  isOpen?: boolean; 
  maxHeight?: number 
}>`
  margin: 0 2px 2px 2px;
  border-radius: 8px;
  max-height: ${props => props.isOpen ? `${props.maxHeight || 400}px` : '0'};
  overflow: hidden;
  background: var(--bg-primary);
  opacity: ${props => props.isOpen ? 1 : 0};
  transform: translateY(${props => props.isOpen ? '0' : '-20px'});
  transition: max-height 0.3s cubic-bezier(0.4, 0, 0.2, 1), 
              opacity 0.2s cubic-bezier(0.4, 0, 0.2, 1), 
              transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  flex-direction: column;
`;

export const MenuContent = styled.div<{ maxHeight?: number }>`
  max-height: ${props => props.maxHeight || 250}px;
  overflow-y: auto;
  flex: 1;
  
  &::-webkit-scrollbar {
    width: 3px;
  }
  
  &::-webkit-scrollbar-track {
    background: var(--bg-secondary);
    border-radius: 3px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: var(--text-thirdly);
    border-radius: 3px;
  }
`;

export const DropdownItem = styled.div<{ 
  isSelected?: boolean;
  animationDelay?: number;
}>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 15px;
  color: var(--text-primary);
  font-size: 14px;
  line-height: 1.5;
  transition: all 0.2s ease;
  cursor: pointer;
  transform-origin: left;
  animation: ${slideInUp} 0.2s ease forwards;
  opacity: 0;
  transform: translateY(5px);
  animation-delay: ${props => props.animationDelay || 0}s;

  &:hover {
    background: var(--bg-thirdly);
  }

  ${props => props.isSelected && css`
    color: var(--primary-color);
    background: var(--bg-thirdly);
    font-weight: 600;
  `}
`;

export const OptionLabel = styled.span`
  flex: 1;
`;

// Стили для SearchableDropdown
export const SearchContainer = styled.div`
  padding: 5px;
  background: var(--bg-primary);
  position: sticky;
  top: 0;
  z-index: 2;
`;

export const SearchInputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

export const SearchInput = styled.input<{ isClearButtonHovered?: boolean }>`
  width: 100%;
  padding: 10px 15px 10px 32px;
  border-radius: 6px;
  border: 1.5px solid transparent;
  background: var(--bg-secondary);
  color: var(--text-primary);
  font-size: 13px;
  transition: all 0.2s ease;

  &:hover {
    border-color: var(--border-color-accent);
    background: var(--bg-secondary);
  }
  
  &:focus {
    outline: none;
    background: var(--bg-fourthly);
  }
  
  &::placeholder {
    color: var(--text-thirdly);
  }

  /* Стили при ховере на кнопке очистки */
  ${props => props.isClearButtonHovered && css`
    border-color: #ff444431 !important;
    background: transparent !important;
    scale: 0.998;
    border-radius: 8px;
  `}
`;

export const SearchIconContainer = styled.div`
  position: absolute;
  left: 12px;
  color: var(--text-thirdly);
  font-size: 12px;
  pointer-events: none;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ClearSearchButton = styled.button`
  position: absolute;
  right: 8px;
  background: none;
  border: none;
  color: var(--text-thirdly);
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    color: #ff4444 !important;
    background: rgba(255, 68, 68, 0.1);
    border-radius: 8px;
    scale: 0.94;
  }
`;

export const ResultsInfo = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 15px 6px 15px;
  font-size: 11px;
  color: var(--text-thirdly);
  border-bottom: 1px solid var(--bg-fourthly);
  background: var(--bg-primary);
`;

export const NoResults = styled.div`
  padding: 20px 15px;
  text-align: center;
  color: var(--text-thirdly);
  font-size: 13px;
  font-style: italic;
`;

// Стили для логотипов
export const OptionLogo = styled.img`
  width: 20px;
  height: 20px;
  object-fit: contain;
  flex-shrink: 0;
  border-radius: 2px;
`;

export const OptionContent = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  flex: 1;
`;

// Адаптивные стили
export const mobileStyles = css`
  @media (max-width: 768px) {
    padding: 10px 12px;
    font-size: 13px;
  }
`;