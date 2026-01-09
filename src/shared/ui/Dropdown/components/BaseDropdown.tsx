// src/shared/ui/Dropdown/components/BaseDropdown.tsx
import React, { useState, useRef, useEffect, useCallback } from 'react'; // Добавляем импорты
import { FaChevronDown, FaCheck, FaTimes, FaLock } from 'react-icons/fa';
import Icon from '@/shared/ui/Icon/Icon';
import { DropdownOption } from '../types/dropdown.types';
import { useDropdown } from '../hooks/useDropdown';
import {
  DropdownContainer,
  DropdownHeader,
  HeaderContent,
  RemoveIconContainer,
  SelectedValue,
  ChevronIcon,
  DropdownMenu,
  MenuContent,
  DropdownItem,
  OptionLabel,
  OptionLogo,
  OptionContent,
  NoResults,
  DisabledDropdownContainer,
  DisabledDropdownHeader,
  DependencyMessage
} from '../styles/DropdownStyles';

interface BaseDropdownProps {
    options: DropdownOption[];
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    className?: string;
    disabled?: boolean;
    dependencies?: {
      enabled: boolean;
      message?: string;
    };
    renderOption?: (option: DropdownOption, isSelected: boolean) => React.ReactNode;
    searchComponent?: React.ReactNode;
    resultsInfo?: React.ReactNode;
    maxHeight?: number;
    onOpen?: () => void;
    onClose?: () => void;
  }
  
export const BaseDropdown: React.FC<BaseDropdownProps> = ({
  options,
  value,
  onChange,
  placeholder = 'Выберите...',
  className = '',
  disabled = false,
  dependencies,
  renderOption,
  searchComponent,
  resultsInfo,
  maxHeight = 400,
  onOpen,
  onClose,
}) => {
  const menuContentRef = useRef<HTMLDivElement>(null);
  const isEffectivelyDisabled = disabled || (dependencies && !dependencies.enabled);

  const {
    isOpen,
    isHovered,
    isRemoveHovered,
    dropdownRef,
    handleOptionClick,
    handleRemoveClick,
    handleDropdownClick,
    setIsHovered,
    setIsRemoveHovered,
  } = useDropdown({ 
    onChange, 
    disabled: isEffectivelyDisabled, 
    onOpen, 
    onClose 
  });

  // Скролл к выбранному элементу при открытии
  const scrollToSelected = useCallback(() => {
    if (menuContentRef.current && value) {
      const selectedElement = menuContentRef.current.querySelector(`[data-value="${value}"]`);
      if (selectedElement) {
        selectedElement.scrollIntoView({ block: 'nearest' });
      }
    }
  }, [value]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(scrollToSelected, 150);
    }
  }, [isOpen, scrollToSelected]);

  const selectedOption = options.find(option => option.value === value);
  const hasValue = value !== 'all' && value !== '';

  const defaultRenderOption = (option: DropdownOption, isSelected: boolean) => (
    <>
      <OptionLabel>{option.label}</OptionLabel>
      {isSelected && <Icon icon={FaCheck} size={12} color="var(--primary-color)" />}
    </>
  );

  const renderOptionWithLogo = (option: DropdownOption, isSelected: boolean) => (
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

  // Если dropdown отключен из-за зависимостей
  if (dependencies && !dependencies.enabled) {
    return (
      <div className={className}>
        <DisabledDropdownContainer>
          <DisabledDropdownHeader>
            <HeaderContent>
              <Icon icon={FaLock} size={12} color="var(--text-thirdly)" />
              <SelectedValue>
                {placeholder}
              </SelectedValue>
            </HeaderContent>
            <ChevronIcon isOpen={false} isHovered={false}>
              <Icon icon={FaChevronDown} size={14} color="var(--text-thirdly)" />
            </ChevronIcon>
          </DisabledDropdownHeader>
        </DisabledDropdownContainer>
        {dependencies.message && (
          <DependencyMessage>{dependencies.message}</DependencyMessage>
        )}
      </div>
    );
  }

  return (
    <div className={className}>
      <DropdownContainer
        ref={dropdownRef}
        isOpen={isOpen}
        isHovered={isHovered}
        isRemoveHovered={isRemoveHovered}
        disabled={isEffectivelyDisabled}
        onMouseEnter={() => !isEffectivelyDisabled && setIsHovered(true)}
        onMouseLeave={() => {
          !isEffectivelyDisabled && setIsHovered(false);
          setIsRemoveHovered(false);
        }}
      >
        <DropdownHeader onClick={handleDropdownClick}>
          <HeaderContent>
            {selectedOption?.logo && (
              <OptionLogo 
                src={selectedOption.logo} 
                alt={selectedOption.label}
              />
            )}
            <SelectedValue>
              {selectedOption?.label || placeholder}
            </SelectedValue>
            {hasValue && !isEffectivelyDisabled && (
              <RemoveIconContainer
                isRemoveHovered={isRemoveHovered}
                isHovered={isHovered}
                onMouseEnter={() => setIsRemoveHovered(true)}
                onMouseLeave={() => setIsRemoveHovered(false)}
                onClick={handleRemoveClick}
              >
                <Icon 
                  icon={FaTimes} 
                  size={14}
                  color={isRemoveHovered ? '#ff4444' : 'var(--text-primary)'}
                />
              </RemoveIconContainer>
            )}
          </HeaderContent>
          <ChevronIcon isOpen={isOpen} isHovered={isHovered}>
            <Icon icon={FaChevronDown} size={14} />
          </ChevronIcon>
        </DropdownHeader>
        
        <DropdownMenu isOpen={isOpen} maxHeight={maxHeight}>
          {searchComponent}
          {resultsInfo}
          
          <MenuContent 
            ref={menuContentRef}
            maxHeight={maxHeight - 120}
          >
            {options.length === 0 ? (
              <NoResults>
                Нет доступных опций
              </NoResults>
            ) : (
              options.map((option, index) => {
                const isSelected = option.value === value;
                return (
                  <DropdownItem
                    key={option.value}
                    data-value={option.value}
                    isSelected={isSelected}
                    animationDelay={index * 0.03}
                    onClick={() => !option.disabled && handleOptionClick(option.value)}
                    style={option.disabled ? { 
                      opacity: 0.5, 
                      cursor: 'not-allowed',
                      pointerEvents: 'none' 
                    } : {}}
                  >
                    {renderOption 
                      ? renderOption(option, isSelected)
                      : option.logo 
                        ? renderOptionWithLogo(option, isSelected)
                        : defaultRenderOption(option, isSelected)
                    }
                  </DropdownItem>
                );
              })
            )}
          </MenuContent>
        </DropdownMenu>
      </DropdownContainer>
    </div>
  );
};