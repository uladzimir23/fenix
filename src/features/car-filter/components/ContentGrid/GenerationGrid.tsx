// src/features/car-filter/components/ContentGrid/GenerationGrid.tsx
import React from 'react';
import { CarBrand, CarModel, Generation } from '@/shared/lib/data';
import { AnimatedCard } from '../AnimatedCard/AnimatedCard';

interface GenerationGridProps {
  generations: Generation[];
  onGenerationSelect: (generation: Generation) => void;
  getFirmwareCountByGeneration: (brandName: string, modelName: string, generationBody: string) => number;
  selectedBrand: CarBrand | null;
  selectedModel: CarModel | null;
}

export const GenerationGrid: React.FC<GenerationGridProps> = ({
  generations,
  onGenerationSelect,
  getFirmwareCountByGeneration,
  selectedBrand,
  selectedModel
}) => {
  return (
    <div className="content-grid">
      {generations.map((generation, index) => {
        const count = getFirmwareCountByGeneration(
          selectedBrand!.name, 
          selectedModel!.name, 
          generation.body
        );
        return (
          <AnimatedCard
            key={index}
            delay={index * 50}
            className="detailed"
            onClick={() => onGenerationSelect(generation)}
          >
            <div className="firmware-count-badge">
              {count}
            </div>
            <h3>{generation.body}</h3>
            <p>{generation.years}</p>
            <p>{count} прошивок</p>
          </AnimatedCard>
        );
      })}
    </div>
  );
};