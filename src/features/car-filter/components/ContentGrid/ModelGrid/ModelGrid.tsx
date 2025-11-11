import React from 'react';
import { CarBrand, CarModel } from '@/shared/lib/data';
import { AnimatedCard } from '../../AnimatedCard/AnimatedCard';
import styles from './ModelGrid.module.scss';

interface ModelGridProps {
  models: CarModel[];
  onModelSelect: (model: CarModel) => void;
  getFirmwareCountByModel: (brandName: string, modelName: string) => number;
  selectedBrand: CarBrand | null;
}

export const ModelGrid: React.FC<ModelGridProps> = ({
  models,
  onModelSelect,
  getFirmwareCountByModel,
  selectedBrand
}) => {
  return (
    <div className={styles.contentGrid}>
      {models.map((model, index) => {
        const count = getFirmwareCountByModel(selectedBrand!.name, model.name);
        return (
          <AnimatedCard
            key={model.id}
            delay={index * 20}
            onClick={() => onModelSelect(model)}
            className={styles.modelCard}
          >
            <div className={styles.firmwareCountBadge}>
              {count}
            </div>
            <h3>{model.name}</h3>
            <p>{count} прошивок</p>
          </AnimatedCard>
        );
      })}
    </div>
  );
};