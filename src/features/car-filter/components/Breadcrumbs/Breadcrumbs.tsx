// src/features/car-filter/components/Breadcrumbs/Breadcrumbs.tsx
import React from 'react';
import { Typography } from '@/shared/ui/Typography/Typography';
import styles from './Breadcrumbs.module.scss';

export interface BreadcrumbsProps {
  viewMode: string;
  selectedBrand: any;
  selectedModel: any;
  selectedGeneration: any;
  selectedEngine: any;
  selectedTuningOption: any;
  onBreadcrumbClick: (mode: string) => void;
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
      <Typography
        variant="caption"
        className={`${styles.breadcrumb} ${viewMode === 'brands' ? styles.active : ''}`}
        onClick={() => onBreadcrumbClick('brands')}
      >
        Марки
      </Typography>
      
      {selectedBrand && (
        <>
          <span className={styles.separator}>›</span>
          <Typography
            variant="caption"
            className={`${styles.breadcrumb} ${viewMode === 'models' ? styles.active : ''}`}
            onClick={() => onBreadcrumbClick('models')}
          >
            {selectedBrand.name}
          </Typography>
        </>
      )}
      
      {/* Остальные breadcrumbs */}
    </div>
  );
};