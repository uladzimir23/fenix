// src/features/car-filter/components/FilterPanel/Breadcrumbs.tsx
import React from 'react';
import { CarBrand, CarModel, Generation } from '@/shared/lib/data';
import { TuningOption } from '@/shared/api';
import { ViewMode } from '../../types/car-filter.types';

interface BreadcrumbsProps {
  viewMode: ViewMode;
  selectedBrand: CarBrand | null;
  selectedModel: CarModel | null;
  selectedGeneration: Generation | null;
  selectedEngine: string | null;
  selectedTuningOption: TuningOption | null;
  onBreadcrumbClick: (mode: ViewMode) => void;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  viewMode,
  selectedBrand,
  selectedModel,
  selectedGeneration,
  selectedEngine,
  selectedTuningOption,
  onBreadcrumbClick
}) => {
  return (
    <div className="breadcrumbs">
      <span
        className={viewMode === 'brands' ? 'active' : ''}
        onClick={() => onBreadcrumbClick('brands')}
      >
        Марки
      </span>
      {selectedBrand && (
        <>
          <span className="breadcrumb-separator">›</span>
          <span
            className={viewMode === 'models' ? 'active' : ''}
            onClick={() => onBreadcrumbClick('models')}
          >
            {selectedBrand.name}
          </span>
        </>
      )}
      {selectedModel && (
        <>
          <span className="breadcrumb-separator">›</span>
          <span
            className={viewMode === 'generations' ? 'active' : ''}
            onClick={() => onBreadcrumbClick('generations')}
          >
            {selectedModel.name}
          </span>
        </>
      )}
      {selectedGeneration && (
        <>
          <span className="breadcrumb-separator">›</span>
          <span
            className={viewMode === 'engines' ? 'active' : ''}
            onClick={() => onBreadcrumbClick('engines')}
          >
            {selectedGeneration.body}
          </span>
        </>
      )}
      {selectedEngine && (
        <>
          <span className="breadcrumb-separator">›</span>
          <span
            className={viewMode === 'tuning' ? 'active' : ''}
            onClick={() => onBreadcrumbClick('tuning')}
          >
            Двигатель
          </span>
        </>
      )}
      {selectedTuningOption && (
        <>
          <span className="breadcrumb-separator">›</span>
          <span
            className={viewMode === 'firmware' ? 'active' : ''}
            onClick={() => onBreadcrumbClick('firmware')}
          >
            {selectedTuningOption.name}
          </span>
        </>
      )}
    </div>
  );
};