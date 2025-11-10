// src/features/car-filter/components/FilterPanel/FilterButtons.tsx
import React from 'react';
import { ViewMode } from '../../types/car-filter.types';

interface FilterButtonsProps {
  viewMode: ViewMode;
  hasActiveFilters: boolean;
  onBack: () => void;
  onClearAll: () => void;
}

export const FilterButtons: React.FC<FilterButtonsProps> = ({
  viewMode,
  hasActiveFilters,
  onBack,
  onClearAll
}) => {
  return (
    <div className='buttons-container'>
      {viewMode !== 'brands' && (
        <button className="back-button" onClick={onBack}>
          Назад
        </button>
      )}
      {hasActiveFilters && (
        <button className="clear-button" onClick={onClearAll}>
          Сбросить
        </button>
      )}
    </div>
  );
};