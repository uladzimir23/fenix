// src/shared/ui/Dropdown/components/SearchableDropdownWithLogos.tsx
import React from 'react';
import { FaCheck } from 'react-icons/fa';
import Icon from '@/shared/ui/Icon/Icon';
import { SearchableDropdown } from './SearchableDropdown';
import { DropdownOption } from '../types/dropdown.types';
import { OptionContent, OptionLogo, OptionLabel } from '../styles/DropdownStyles';

interface SearchableDropdownWithLogosProps {
  options: DropdownOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  searchPlaceholder?: string;
  maxHeight?: number;
  disabled?: boolean;
  dependencies?: {
    enabled: boolean;
    message?: string;
  };
}

export const SearchableDropdownWithLogos: React.FC<SearchableDropdownWithLogosProps> = (props) => {
  const renderOption = (option: DropdownOption, isSelected: boolean) => (
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
    <SearchableDropdown
      {...props}
      renderOption={renderOption}
    />
  );
};