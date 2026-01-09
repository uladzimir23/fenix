// src/shared/ui/Dropdown/components/MultiSelectDropdown.tsx
import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { FaChevronDown, FaTimes, FaCheck } from 'react-icons/fa';
import { css } from '@emotion/react'; // Добавляем импорт css
import styled from '@emotion/styled';
import Icon from '@/shared/ui/Icon/Icon';
import { MultiSelectDropdownProps, DropdownOption } from '../types/dropdown.types';
import { useDropdown } from '../hooks/useDropdown';
import {
  DropdownContainer,
  DropdownHeader,
  HeaderContent,
  SelectedValue,
  ChevronIcon,
  DropdownMenu,
  MenuContent,
  DropdownItem,
  OptionLabel,
  OptionLogo,
  OptionContent,
  NoResults
} from '../styles/DropdownStyles';

// Стили для выбранных элементов
const SelectedItemsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  flex: 1;
  min-height: 24px;
  align-items: center;
`;

const SelectedItem = styled.div<{ isRemoveHovered?: boolean }>`
  background: var(--accent-color);
  color: var(--primary-color);
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: all 0.2s ease;
  cursor: default;
  border: 1px solid transparent;

  ${props => props.isRemoveHovered && css`
    background: var(--bg-primary);
    color: #ff4444;
    border: 1px solid rgba(255, 68, 68, 0.192);
    box-shadow: inset 0px 0px 1.5px rgba(0, 0, 0, 0.4);
    border-radius: 8px;
    scale: 0.99;
  `}
`;

const RemoveIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2px;
  border-radius: 3px;
  transition: all 0.2s ease;
  cursor: pointer;
  opacity: 0.7;

  &:hover {
    opacity: 1;
    background: rgba(255, 68, 68, 0.1);
  }
`;

const PlaceholderText = styled.span`
  color: var(--text-thirdly);
  font-size: 14px;
`;

// Стили для MultiSelect dropdown
const MultiSelectDropdownContainer = styled(DropdownContainer)`
  min-height: 44px;
`;

const MultiSelectHeader = styled(DropdownHeader)`
  min-height: 44px;
  align-items: center;
  padding-top: 10px;
  padding-bottom: 10px;
`;

export const MultiSelectDropdown: React.FC<MultiSelectDropdownProps> = ({
  selectedValues,
  onChange,
  options,
  placeholder = 'Выберите...',
  className = '',
  disabled = false,
  maxHeight = 400,
  renderSelectedItem
}) => {
  const [isRemoveHovered, setIsRemoveHovered] = useState<string | null>(null);
  const menuContentRef = useRef<HTMLDivElement>(null);

  const {
    isOpen,
    isHovered,
    dropdownRef,
    handleDropdownClick,
    setIsHovered,
  } = useDropdown({ 
    onChange: () => {}, // Переопределим логику
    disabled 
  });

  // Обработчик выбора опции
  const handleOptionClick = useCallback((value: string) => {
    if (disabled) return;

    const newSelectedValues = selectedValues.includes(value)
      ? selectedValues.filter(v => v !== value) // Удаляем если уже выбран
      : [...selectedValues, value]; // Добавляем если не выбран

    onChange(newSelectedValues);
  }, [selectedValues, onChange, disabled]);

  // Обработчик удаления выбранного элемента
  const handleRemoveItem = useCallback((value: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (disabled) return;

    const newSelectedValues = selectedValues.filter(v => v !== value);
    onChange(newSelectedValues);
  }, [selectedValues, onChange, disabled]);

  // Получаем выбранные опции
  const selectedOptions = useMemo(() => {
    return options.filter(option => selectedValues.includes(option.value));
  }, [options, selectedValues]);

  // Рендер выбранных элементов по умолчанию
  const defaultRenderSelectedItem = useCallback((option: DropdownOption) => {
    const handleRemove = (e: React.MouseEvent) => handleRemoveItem(option.value, e);
    
    return (
      <SelectedItem
        key={option.value}
        isRemoveHovered={isRemoveHovered === option.value}
        onMouseEnter={() => setIsRemoveHovered(option.value)}
        onMouseLeave={() => setIsRemoveHovered(null)}
      >
        <span>{option.label}</span>
        <RemoveIcon onClick={handleRemove}>
          <Icon icon={FaTimes} size={10} />
        </RemoveIcon>
      </SelectedItem>
    );
  }, [isRemoveHovered, handleRemoveItem]);

  // Скролл к выбранному элементу при открытии
  const scrollToSelected = useCallback(() => {
    if (menuContentRef.current && selectedValues.length > 0) {
      const firstSelectedValue = selectedValues[0];
      const selectedElement = menuContentRef.current.querySelector(`[data-value="${firstSelectedValue}"]`);
      if (selectedElement) {
        selectedElement.scrollIntoView({ block: 'nearest' });
      }
    }
  }, [selectedValues]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(scrollToSelected, 150);
    }
  }, [isOpen, scrollToSelected]);

  const defaultRenderOption = (option: DropdownOption, isSelected: boolean) => (
    <OptionContent>
      {option.logo && (
        <OptionLogo 
          src={option.logo} 
          alt={option.label}
        />
      )}
      <OptionLabel>{option.label}</OptionLabel>
      {isSelected && <Icon icon={FaCheck} size={12} color="var(--primary-color)" />}
    </OptionContent>
  );

  return (
    <MultiSelectDropdownContainer
      ref={dropdownRef}
      isOpen={isOpen}
      isHovered={isHovered}
      disabled={disabled}
      className={className}
      onMouseEnter={() => !disabled && setIsHovered(true)}
      onMouseLeave={() => !disabled && setIsHovered(false)}
    >
      <MultiSelectHeader onClick={handleDropdownClick}>
        <HeaderContent style={{ alignItems: 'center' }}>
          <SelectedItemsContainer>
            {selectedOptions.length === 0 ? (
              <PlaceholderText>{placeholder}</PlaceholderText>
            ) : (
              selectedOptions.map(option => 
                renderSelectedItem 
                  ? renderSelectedItem(option, () => {}) // Для кастомного рендера
                  : defaultRenderSelectedItem(option)
              )
            )}
          </SelectedItemsContainer>
        </HeaderContent>
        <ChevronIcon isOpen={isOpen} isHovered={isHovered}>
          <Icon icon={FaChevronDown} size={14} />
        </ChevronIcon>
      </MultiSelectHeader>
      
      <DropdownMenu isOpen={isOpen} maxHeight={maxHeight}>
        <MenuContent 
          ref={menuContentRef}
          maxHeight={maxHeight - 40}
        >
          {options.length === 0 ? (
            <NoResults>
              Нет доступных опций
            </NoResults>
          ) : (
            options.map((option, index) => {
              const isSelected = selectedValues.includes(option.value);
              return (
                <DropdownItem
                  key={option.value}
                  data-value={option.value}
                  isSelected={isSelected}
                  animationDelay={index * 0.03}
                  onClick={() => handleOptionClick(option.value)}
                >
                  {defaultRenderOption(option, isSelected)}
                </DropdownItem>
              );
            })
          )}
        </MenuContent>
      </DropdownMenu>
    </MultiSelectDropdownContainer>
  );
};