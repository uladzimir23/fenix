import React from 'react';
import { CarBrand, CarModel, Generation } from '@/shared/lib/data';
import { TuningOption } from '@/shared/api';
import { ViewMode } from '../../../types/car-filter.types';
import styles from './Breadcrumbs.module.scss';

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
    <div className={styles.breadcrumbs}>
      <span
        className={`${styles.breadcrumbItem} ${viewMode === 'brands' ? styles.active : ''}`}
        onClick={() => onBreadcrumbClick('brands')}
      >
        Марки
      </span>
      {selectedBrand && (
        <>
          <span className={styles.breadcrumbSeparator}>›</span>
          <span
            className={`${styles.breadcrumbItem} ${viewMode === 'models' ? styles.active : ''}`}
            onClick={() => onBreadcrumbClick('models')}
          >
            {selectedBrand.name}
          </span>
        </>
      )}
      {selectedModel && (
        <>
          <span className={styles.breadcrumbSeparator}>›</span>
          <span
            className={`${styles.breadcrumbItem} ${viewMode === 'generations' ? styles.active : ''}`}
            onClick={() => onBreadcrumbClick('generations')}
          >
            {selectedModel.name}
          </span>
        </>
      )}
      {selectedGeneration && (
        <>
          <span className={styles.breadcrumbSeparator}>›</span>
          <span
            className={`${styles.breadcrumbItem} ${viewMode === 'engines' ? styles.active : ''}`}
            onClick={() => onBreadcrumbClick('engines')}
          >
            {selectedGeneration.body}
          </span>
        </>
      )}
      {selectedEngine && (
        <>
          <span className={styles.breadcrumbSeparator}>›</span>
          <span
            className={`${styles.breadcrumbItem} ${viewMode === 'tuning' ? styles.active : ''}`}
            onClick={() => onBreadcrumbClick('tuning')}
          >
            Двигатель
          </span>
        </>
      )}
      {selectedTuningOption && (
        <>
          <span className={styles.breadcrumbSeparator}>›</span>
          <span
            className={`${styles.breadcrumbItem} ${viewMode === 'firmware' ? styles.active : ''}`}
            onClick={() => onBreadcrumbClick('firmware')}
          >
            {selectedTuningOption.name}
          </span>
        </>
      )}
    </div>
  );
};