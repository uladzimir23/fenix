// src/features/car-filter/components/FilterPanel/SearchInput.tsx
import React from 'react';
import { FaSearch } from 'react-icons/fa';
import Icon from '@/shared/ui/Icon/Icon.tsx';

interface SearchInputProps {
  value: string;
  placeholder: string;
  onChange: (value: string) => void;
}

export const SearchInput: React.FC<SearchInputProps> = ({
  value,
  placeholder,
  onChange
}) => {
  return (
    <div className="search-input">
      <Icon icon={FaSearch} className="search-icon" />
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};