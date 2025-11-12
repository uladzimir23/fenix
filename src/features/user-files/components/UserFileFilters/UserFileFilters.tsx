// src/features/user-files/components/UserFileFilters/UserFileFilters.tsx
import React from 'react';
import { FileFilters } from '@/shared/api/types/user-file';
import { Dropdown } from '@/shared/ui/Dropdown/Dropdown';
import { SearchInput } from '@/features/car-filter/components/FilterPanel/SearchInput/SearchInput';
import styles from './UserFileFilters.module.scss';

import { SearchableDropdown } from '@/shared/ui/SearchableDropdown/SearchableDropdown';


interface UserFileFiltersProps {
  filters: FileFilters;
  onFiltersChange: (filters: FileFilters) => void;
  brands: string[];
  categories: string[];
}


export const UserFileFilters: React.FC<UserFileFiltersProps> = ({
  filters,
  onFiltersChange,
  brands,
  categories
}) => {
  const handleFilterChange = (key: keyof FileFilters, value: string) => {
    onFiltersChange({
      ...filters,
      [key]: value
    });
  };

  const statusOptions = [
    { value: 'all', label: 'Все статусы' },
    { value: 'pending', label: 'На проверке' },
    { value: 'approved', label: 'Одобрено' },
    { value: 'rejected', label: 'Отклонено' }
  ];

  const sortOptions = [
    { value: 'newest', label: 'Сначала новые' },
    { value: 'oldest', label: 'Сначала старые' },
    { value: 'downloads', label: 'По популярности' },
    { value: 'rating', label: 'По рейтингу' }
  ];

  const brandOptions = [
    { value: 'all', label: 'Все марки' },
    ...brands.filter(brand => brand !== 'all').map(brand => ({
      value: brand,
      label: brand
    }))
  ];

  const categoryOptions = [
    { value: 'all', label: 'Все категории' },
    ...categories.filter(cat => cat !== 'all').map(cat => ({
      value: cat,
      label: cat
    }))
  ];

  return (
    <div className={styles.userFileFilters}>
      <div className={styles.headerFilterPanel}>
        <h2>Фильтры файлов</h2>
      </div>
      
      <div className={styles.filtersContent}>
        <div className={styles.searchSection}>
          <SearchInput
            value={filters.searchQuery}
            placeholder="Поиск..."
            onChange={(value) => handleFilterChange('searchQuery', value)}
          />
        </div>

        <div className={styles.filtersSection}>
          <div className={styles.filterGroup}>
            <label className={styles.filterLabel}>Статус</label>
            <Dropdown
              options={statusOptions}
              value={filters.status}
              onChange={(value) => handleFilterChange('status', value)}
            />
          </div>

          <div className={styles.filterGroup}>
            <label className={styles.filterLabel}>Категория</label>
            <SearchableDropdown
                options={categoryOptions}
                value={filters.category}
                onChange={(value) => handleFilterChange('category', value)}
                searchPlaceholder="Поиск категории..."
                maxHeight={350}
                //virtualScroll={categoryOptions.length > 100}
            />
            </div>

          <div className={styles.filterGroup}>
            <label className={styles.filterLabel}>Марка</label>
            <Dropdown
              options={brandOptions}
              value={filters.brand}
              onChange={(value) => handleFilterChange('brand', value)}
            />
          </div>

          <div className={styles.filterGroup}>
            <label className={styles.filterLabel}>Сортировка</label>
            <Dropdown
              options={sortOptions}
              value={filters.sortBy}
              onChange={(value) => handleFilterChange('sortBy', value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};