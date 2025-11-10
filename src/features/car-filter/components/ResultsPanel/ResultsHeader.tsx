// src/features/car-filter/components/ResultsPanel/ResultsHeader.tsx
import React from 'react';
import { FaTimes } from 'react-icons/fa';
import Icon from '@/shared/ui/Icon/Icon.tsx';
import { CarFilterState } from '../../types/car-filter.types';

interface ResultsHeaderProps {
  state: CarFilterState;
  onClearAll: () => void;
}

export const ResultsHeader: React.FC<ResultsHeaderProps> = ({
  state,
  onClearAll
}) => {
  const { viewMode, selectedBrand, selectedModel, selectedGeneration, selectedEngine, selectedTuningOption } = state;

  const getTitle = () => {
    switch (viewMode) {
      case 'brands': return `Все марки автомобилей`;
      case 'models': return `Модели ${selectedBrand?.name}`;
      case 'generations': return `Поколения ${selectedModel?.name}`;
      case 'engines': return `Двигатели ${selectedGeneration?.body}`;
      case 'tuning': return `Опции тюнинга для ${selectedEngine}`;
      case 'firmware': return `Прошивки ${selectedTuningOption?.name}`;
      default: return '';
    }
  };

  const hasActiveFilters = selectedBrand || selectedModel || selectedGeneration || 
    selectedEngine || selectedTuningOption || Object.values(state.searchTerms).some(term => term !== '');

  return (
    <div className="results-header">
      <h2>{getTitle()}</h2>
      {hasActiveFilters && (
        <button className="clear-results" onClick={onClearAll}>
          <Icon icon={FaTimes} /> Очистить
        </button>
      )}
    </div>
  );
};