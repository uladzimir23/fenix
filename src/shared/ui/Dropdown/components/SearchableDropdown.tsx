// src/shared/ui/Dropdown/components/SearchableDropdown.tsx
import React, { useState, useRef, useMemo, useEffect } from 'react';
import { FaSearch, FaTimes } from 'react-icons/fa';
import Icon from '@/shared/ui/Icon/Icon';
import { BaseDropdown } from './BaseDropdown';
import { SearchableDropdownProps } from '../types/dropdown.types';
import {
  SearchContainer,
  SearchInputWrapper,
  SearchInput,
  SearchIconContainer,
  ClearSearchButton,
  ResultsInfo
} from '../styles/DropdownStyles';

export const SearchableDropdown: React.FC<SearchableDropdownProps> = ({
  options,
  value,
  onChange,
  placeholder = 'Выберите...',
  className = '',
  searchPlaceholder = 'Поиск...',
  maxHeight = 300,
  disabled = false,
  renderOption,
  dependencies,
  ...rest
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isClearButtonHovered, setIsClearButtonHovered] = useState(false); // Новое состояние для ховера

  const filteredOptions = useMemo(() => {
    if (!searchQuery.trim()) return options;
    
    const query = searchQuery.toLowerCase().trim();
    return options.filter(option =>
      option.label.toLowerCase().includes(query)
    );
  }, [options, searchQuery]);

  // Автофокус при открытии dropdown
  useEffect(() => {
    if (isDropdownOpen && searchInputRef.current) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 100);
    }
  }, [isDropdownOpen]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    setIsClearButtonHovered(false); // Сбрасываем состояние ховера при нажатии
    searchInputRef.current?.focus();
  };

  const handleSearchKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setSearchQuery('');
    }
  };

  const handleDropdownOpen = () => {
    setIsDropdownOpen(true);
  };

  const handleDropdownClose = () => {
    setIsDropdownOpen(false);
    setSearchQuery('');
    setIsClearButtonHovered(false); // Сбрасываем состояние ховера при закрытии
  };

  const handleClearButtonMouseEnter = () => {
    setIsClearButtonHovered(true);
  };

  const handleClearButtonMouseLeave = () => {
    setIsClearButtonHovered(false);
  };

  const searchComponent = (
    <SearchContainer>
      <SearchInputWrapper>
        <SearchIconContainer>
          <Icon icon={FaSearch} size={12} />
        </SearchIconContainer>
        <SearchInput
          ref={searchInputRef}
          type="text"
          placeholder={searchPlaceholder}
          value={searchQuery}
          onChange={handleSearchChange}
          onKeyDown={handleSearchKeyDown}
          onClick={(e) => e.stopPropagation()}
          isClearButtonHovered={isClearButtonHovered} // Передаем состояние ховера
        />
        {searchQuery && (
          <ClearSearchButton 
            onClick={handleClearSearch}
            onMouseEnter={handleClearButtonMouseEnter}
            onMouseLeave={handleClearButtonMouseLeave}
          >
            <Icon icon={FaTimes} size={12} />
          </ClearSearchButton>
        )}
      </SearchInputWrapper>
    </SearchContainer>
  );

  const resultsInfo = (
    <ResultsInfo>
      <span style={{ fontWeight: 500 }}>
        Найдено: {filteredOptions.length}
        {filteredOptions.length !== options.length && ` из ${options.length}`}
      </span>
    </ResultsInfo>
  );

  return (
    <BaseDropdown
      {...rest}
      options={filteredOptions}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={className}
      disabled={disabled}
      dependencies={dependencies}
      searchComponent={searchComponent}
      resultsInfo={resultsInfo}
      maxHeight={maxHeight}
      renderOption={renderOption}
      onOpen={handleDropdownOpen}
      onClose={handleDropdownClose}
    />
  );
};