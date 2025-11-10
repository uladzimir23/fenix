// src/features/car-filter/components/ContentGrid/TuningOptionsGrid.tsx
import React from 'react';
import { TuningOption } from '@/shared/api';
import { AnimatedCard } from '../AnimatedCard/AnimatedCard';
import { TuningOptionWithCount } from '../../types/car-filter.types';

interface TuningOptionsGridProps {
  availableOptions: TuningOptionWithCount[];
  unavailableOptions: TuningOptionWithCount[];
  onTuningOptionSelect: (option: TuningOption) => void;
  mockFirmwareFiles: any[];
  selectedEngine: string | null;
}

export const TuningOptionsGrid: React.FC<TuningOptionsGridProps> = ({
  availableOptions,
  unavailableOptions,
  onTuningOptionSelect,
  mockFirmwareFiles,
  selectedEngine
}) => {
  return (
    <div className="tuning-options-container">
      {availableOptions.length > 0 && (
        <div className="tuning-section">
          <h3 className="tuning-section-title">Доступные опции</h3>
          <div className="content-grid tuning-grid">
            {availableOptions.map((option, index) => {
              const correspondingFirmware = mockFirmwareFiles.find(firmware => 
                firmware.engine === selectedEngine && 
                firmware.category === option.category
              );
              
              return (
                <AnimatedCard
                  key={option.id}
                  delay={index * 30}
                  className="detailed tuning-option"
                  onClick={() => onTuningOptionSelect(option)}
                >
                  <div className="firmware-count-badge">
                    {option.count}
                  </div>
                  <h3>{option.name}</h3>
                  <p className="category">{option.category}</p>
                  {correspondingFirmware?.price && (
                    <p className="price">От {correspondingFirmware.price} ₽</p>
                  )}
                  <p className="count-info">{option.count} прошивок доступно</p>
                  <div className="description">
                    {option.description?.split('\n').map((line: string, i: number) => (
                      <p key={i}>{line}</p>
                    ))}
                  </div>
                </AnimatedCard>
              );
            })}
          </div>
        </div>
      )}

      {unavailableOptions.length > 0 && (
        <div className="tuning-section">
          <h3 className="tuning-section-title">Нет в наличии</h3>
          <div className="content-grid tuning-grid">
            {unavailableOptions.map((option, index) => (
              <AnimatedCard
                key={option.id}
                delay={index * 40}
                className="detailed tuning-option unavailable"
              >
                <div className="firmware-count-badge unavailable-badge">
                  0
                </div>
                <h3>{option.name}</h3>
                <p className="category">{option.category}</p>
                <p className="unavailable-text">Нет в наличии</p>
                <div className="description">
                  {option.description?.split('\n').map((line: string, i: number) => (
                    <p key={i}>{line}</p>
                  ))}
                </div>
              </AnimatedCard>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};