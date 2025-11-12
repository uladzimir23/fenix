// src/shared/ui/SearchableDropdownWithLogos/SearchableDropdownWithLogos.tsx
import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { FaChevronDown, FaCheck, FaTimes, FaSearch } from 'react-icons/fa';
import Icon from '@/shared/ui/Icon/Icon';
import styles from './SearchableDropdownWithLogos.module.scss';

export interface DropdownOptionWithLogo {
  value: string;
  label: string;
  logo?: string;
}

export interface SearchableDropdownWithLogosProps {
  options: DropdownOptionWithLogo[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  searchPlaceholder?: string;
  maxHeight?: number;
  disabled?: boolean;
}

export const SearchableDropdownWithLogos: React.FC<SearchableDropdownWithLogosProps> = ({
  options,
  value,
  onChange,
  placeholder = 'Выберите...',
  className = '',
  searchPlaceholder = 'Поиск...',
  maxHeight = 300,
  disabled = false
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isRemoveHovered, setIsRemoveHovered] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const menuContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearchQuery('');
        setIsRemoveHovered(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Сброс состояний при изменении значения
  useEffect(() => {
    setIsRemoveHovered(false);
  }, [value]);

    // Фокус на поле поиска при открытии
    useEffect(() => {
      if (isOpen && searchInputRef.current) {
        setTimeout(() => {
          searchInputRef.current?.focus();
        }, 100);
      }
    }, [isOpen]);
  

  const filteredOptions = useMemo(() => {
    if (!searchQuery.trim()) return options;
    
    const query = searchQuery.toLowerCase().trim();
    return options.filter(option =>
      option.label.toLowerCase().includes(query)
    );
  }, [options, searchQuery]);

  const selectedOption = options.find(option => option.value === value);
  const hasValue = value !== 'all' && value !== '';

  const handleOptionClick = useCallback((optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
    setSearchQuery('');
    setIsRemoveHovered(false);
  }, [onChange]);

  const handleRemoveClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange('all');
    setSearchQuery('');
    setIsRemoveHovered(false);
  };

  const handleDropdownClick = () => {
    if (disabled) return;
    setIsOpen(!isOpen);
    setSearchQuery('');
    setIsRemoveHovered(false);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsOpen(false);
      setSearchQuery('');
      setIsRemoveHovered(false);
    } else if (e.key === 'Enter' && filteredOptions.length === 1) {
      handleOptionClick(filteredOptions[0].value);
    }
  };

  const handleClearSearch = () => {
    setSearchQuery('');
  };

  const scrollToSelected = useCallback(() => {
    if (menuContentRef.current && value) {
      const selectedElement = menuContentRef.current.querySelector(`[data-value="${value}"]`);
      if (selectedElement) {
        selectedElement.scrollIntoView({ block: 'nearest' });
      }
    }
  }, [value]);

  // Скролл к выбранному элементу при открытии
  useEffect(() => {
    if (isOpen) {
      setTimeout(scrollToSelected, 100);
    }
  }, [isOpen, scrollToSelected]);

  return (
    <div 
      ref={dropdownRef}
      className={`${styles.searchableDropdown} ${className} ${isOpen ? styles.open : ''} ${
        isHovered ? styles.hovered : ''
      } ${isRemoveHovered ? styles.removeHovered : ''} ${disabled ? styles.disabled : ''}`}
      onMouseEnter={() => !disabled && setIsHovered(true)}
      onMouseLeave={() => {
        !disabled && setIsHovered(false);
        setIsRemoveHovered(false);
      }}
    >
      <div 
        className={styles.dropdownHeader}
        onClick={handleDropdownClick}
      >
        <div className={styles.headerContent}>
          <span className={styles.selectedValue}>
            {selectedOption?.label || placeholder}
          </span>
          {hasValue && !disabled && (
            <div 
              className={styles.removeIconContainer}
              onMouseEnter={() => setIsRemoveHovered(true)}
              onMouseLeave={() => setIsRemoveHovered(false)}
              onClick={handleRemoveClick}
            >
              <Icon 
                icon={FaTimes} 
                className={styles.removeIcon}
              />
            </div>
          )}
        </div>
        <Icon 
          icon={FaChevronDown} 
          className={`${styles.chevron} ${isOpen ? styles.rotated : ''}`}
        />
      </div>
      
      <div 
        className={`${styles.dropdownMenu} ${isOpen ? styles.open : ''}`}
        style={{ maxHeight: isOpen ? `${maxHeight}px` : '0' }}
      >
        {/* Блок поиска */}
        <div className={styles.searchContainer}>
          <div className={styles.searchInputWrapper}>
            <Icon icon={FaSearch} className={styles.searchIcon} />
            <input
              ref={searchInputRef}
              type="text"
              placeholder={searchPlaceholder}
              value={searchQuery}
              onChange={handleSearchChange}
              onKeyDown={handleSearchKeyDown}
              className={styles.searchInput}
            />
            {searchQuery && (
              <button 
                className={styles.clearSearchButton}
                onClick={handleClearSearch}
              >
                <Icon icon={FaTimes} className={styles.clearSearchIcon} />
              </button>
            )}
          </div>
        </div>


        {/* Информация о результатах */}
        <div className={styles.resultsInfo}>
          <span className={styles.resultsCount}>
            Найдено: {filteredOptions.length}
            {filteredOptions.length !== options.length && ` из ${options.length}`}
          </span>
        </div>


        {/* Список опций с поддержкой скролла */}
        <div 
          ref={menuContentRef}
          className={styles.menuContent}
          style={{ maxHeight: maxHeight - 120 }}
        >
          {filteredOptions.length === 0 ? (
            <div className={styles.noResults}>
              {searchQuery ? 'Ничего не найдено' : 'Нет доступных опций'}
            </div>
          ) : (
            filteredOptions.map((option) => (
              <div
                key={option.value}
                data-value={option.value}
                className={`${styles.dropdownItem} ${
                  option.value === value ? styles.selected : ''
                }`}
                onClick={() => handleOptionClick(option.value)}
              >
                <div className={styles.optionContent}>
                  {option.logo && (
                    <img 
                      src={option.logo} 
                      alt={option.label}
                      className={styles.optionLogo}
                    />
                  )}
                  <span className={styles.optionLabel}>{option.label}</span>
                </div>
                {option.value === value && (
                  <Icon icon={FaCheck} className={styles.checkIcon} />
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};