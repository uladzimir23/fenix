// src/features/user-files/components/UserFileFilters/UserFileFilters.tsx
import React, { useMemo } from 'react';
import { css } from '@emotion/react';
import { FileFilters } from '@/shared/api/types/user-file';
import { CarBrand } from '@/shared/lib/data/car-data/types';
import { Dropdown } from '@/shared/ui/Dropdown/Dropdown';
import { SearchableDropdown } from '@/shared/ui/Dropdown/components/SearchableDropdown';
import { SearchableDropdownWithLogos } from '@/shared/ui/Dropdown/components/SearchableDropdownWithLogos';
import { CarDependencyChain } from '@/shared/ui/Dropdown/components/CarDependencyChain';
import { CarSelection } from '@/shared/ui/Dropdown/types/dropdown.types';
import { SearchInput } from '@/features/car-filter/components/FilterPanel/SearchInput/SearchInput';

interface UserFileFiltersProps {
  filters: FileFilters;
  onFiltersChange: (filters: FileFilters) => void;
  brands: CarBrand[];
  categories: string[];
  enableCarFilter?: boolean;
}

const containerStyles = css`
  background: var(--bg-primary);
  box-shadow: var(--box-shadow-primary);
  border-radius: 14px;
  height: fit-content;
  position: sticky;
  box-sizing: border-box;
  overflow: hidden;
  max-height: calc(100vh - 40px);

  @media (max-width: 968px) {
    position: static;
    margin-bottom: 20px;
    width: 100%;
    max-height: none;
  }
`;

const headerStyles = css`
  border-bottom: 1px solid var(--border-color);
  background-color: var(--bg-primary);
  color: rgb(255, 255, 255);
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  padding: 15px 20px;

  h2 {
    margin: 3px 0;
    color: var(--text-primary);
    font-size: 18px;
  }
`;

const filtersContentStyles = css`
  margin: 15px;
`;

const filtersSectionStyles = css`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const filterGroupStyles = css`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const sectionDividerStyles = css`
  height: 1px;
  background: var(--border-color);
  margin: 8px 0;
  opacity: 0.6;
`;

export const UserFileFilters: React.FC<UserFileFiltersProps> = ({
  filters,
  onFiltersChange,
  brands,
  categories,
  enableCarFilter = false
}) => {
  const handleFilterChange = (key: keyof FileFilters, value: string) => {
    onFiltersChange({
      ...filters,
      [key]: value
    });
  };

  const handleCarSelectionChange = (carSelection: CarSelection) => {
    onFiltersChange({
      ...filters,
      brand: carSelection.brand,
      model: carSelection.model,
      generation: carSelection.generation,
      engine: carSelection.engine
    });
  };

  const carSelection: CarSelection = useMemo(() => ({
    brand: filters.brand || 'all',
    model: filters.model || 'all',
    generation: filters.generation || 'all',
    engine: filters.engine || 'all'
  }), [filters]);

  const { statusOptions, sortOptions, brandOptions, categoryOptions } = useMemo(() => ({
    statusOptions: [
      { value: 'all', label: 'Все статусы' },
      { value: 'pending', label: 'На проверке' },
      { value: 'approved', label: 'Одобрено' },
      { value: 'rejected', label: 'Отклонено' }
    ],
    sortOptions: [
      { value: 'newest', label: 'Сначала новые' },
      { value: 'oldest', label: 'Сначала старые' },
      { value: 'downloads', label: 'По популярности' },
      { value: 'rating', label: 'По рейтингу' }
    ],
    brandOptions: [
      { value: 'all', label: 'Все марки' },
      ...brands
        .filter((brand: CarBrand) => brand && brand.name !== 'all')
        .sort((a: CarBrand, b: CarBrand) => a.name.localeCompare(b.name))
        .map((brand: CarBrand) => ({
          value: brand.name,
          label: brand.name,
          logo: brand.logo
        }))
    ],
    categoryOptions: [
      { value: 'all', label: 'Все категории' },
      ...categories
        .filter((cat: string) => cat && cat !== 'all')
        .map((cat: string) => ({
          value: cat,
          label: cat
        }))
    ]
  }), [brands, categories]);

  return (
    <div css={containerStyles}>
      <div css={headerStyles}>
        <h2>Фильтры файлов</h2>
      </div>
      
      <div css={filtersContentStyles}>
        <div css={{ marginBottom: '15px' }}>
          <SearchInput
            value={filters.searchQuery}
            placeholder="Поиск по файлам..."
            onChange={(value) => handleFilterChange('searchQuery', value)}
          />
        </div>

        <div css={filtersSectionStyles}>
          {/* Основные фильтры */}
          <div css={filterGroupStyles}>
            <Dropdown
              options={statusOptions}
              value={filters.status}
              onChange={(value) => handleFilterChange('status', value)}
            />
          </div>

          <div css={filterGroupStyles}>
            <SearchableDropdown
              options={categoryOptions}
              value={filters.category}
              onChange={(value) => handleFilterChange('category', value)}
              searchPlaceholder="Поиск категории..."
              maxHeight={350}
            />
          </div>

          {/* Расширенный фильтр автомобилей */}
          {enableCarFilter && (
            <>
              <div css={sectionDividerStyles} />
              <div css={filterGroupStyles}>
                <CarDependencyChain
                  selection={carSelection}
                  onSelectionChange={handleCarSelectionChange}
                  carBrands={brands}
                />
              </div>
              <div css={sectionDividerStyles} />
            </>
          )}

          {/* Простой фильтр бренда (если расширенный отключен) */}
          {!enableCarFilter && (
            <div css={filterGroupStyles}>
              <SearchableDropdownWithLogos
                options={brandOptions}
                value={filters.brand}
                onChange={(value) => handleFilterChange('brand', value)}
                searchPlaceholder="Поиск марки..."
                maxHeight={400}
              />
            </div>
          )}

          <div css={filterGroupStyles}>
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