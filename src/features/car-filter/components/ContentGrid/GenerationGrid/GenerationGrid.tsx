import React from 'react';
import { CarBrand, CarModel, Generation } from '@/shared/lib/data';
import { AnimatedCard } from '../../AnimatedCard/AnimatedCard';
import styles from './GenerationGrid.module.scss';

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
    <div className={styles.contentGrid}>
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
            onClick={() => onGenerationSelect(generation)}
            className={`detailed ${styles.generationCard}`}
          >
            <div className={styles.firmwareCountBadge}>
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