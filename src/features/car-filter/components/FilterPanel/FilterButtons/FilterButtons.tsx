import React from 'react';
import { ViewMode } from '../../../types/car-filter.types';
import styles from './FilterButtons.module.scss';

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
    <div className={styles.buttonsContainer}>
      {viewMode !== 'brands' && (
        <button className={styles.backButton} onClick={onBack}>
          Назад
        </button>
      )}
      {hasActiveFilters && (
        <button className={styles.clearButton} onClick={onClearAll}>
          Сбросить
        </button>
      )}
    </div>
  );
};