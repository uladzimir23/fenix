// src/features/car-filter/components/ContentGrid/ModelGrid.tsx
import React from 'react';
import { CarBrand, CarModel } from '@/shared/lib/data';
import { AnimatedCard } from '../AnimatedCard/AnimatedCard';

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
    <div className="content-grid">
      {models.map((model, index) => {
        const count = getFirmwareCountByModel(selectedBrand!.name, model.name);
        return (
          <AnimatedCard
            key={model.id}
            delay={index * 20}
            onClick={() => onModelSelect(model)}
          >
            <div className="firmware-count-badge">
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