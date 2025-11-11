import React from 'react';
import { FaSearch } from 'react-icons/fa';
import Icon from '@/shared/ui/Icon/Icon.tsx';
import styles from './SearchInput.module.scss';

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
    <div className={styles.searchInput}>
      <Icon icon={FaSearch} className={styles.searchIcon} />
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};