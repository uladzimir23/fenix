import React from 'react';
import { TuningOption } from '@/shared/api';
import { AnimatedCard } from '../../AnimatedCard/AnimatedCard';
import { TuningOptionWithCount } from '../../../types/car-filter.types';
import styles from './TuningOptionsGrid.module.scss';

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
    <div className={styles.tuningOptionsContainer}>
      {availableOptions.length > 0 && (
        <div className={styles.tuningSection}>
          <h3 className={styles.tuningSectionTitle}>Доступные опции</h3>
          <div className={`${styles.contentGrid} ${styles.tuningGrid}`}>
            {availableOptions.map((option, index) => {
              const correspondingFirmware = mockFirmwareFiles.find(firmware => 
                firmware.engine === selectedEngine && 
                firmware.category === option.category
              );
              
              return (
                <AnimatedCard
                  key={option.id}
                  delay={index * 30}
                  className={`detailed ${styles.tuningOption}`}
                  onClick={() => onTuningOptionSelect(option)}
                >
                  <div className={styles.firmwareCountBadge}>
                    {option.count}
                  </div>
                  <h3>{option.name}</h3>
                  <p className={styles.category}>{option.category}</p>
                  {correspondingFirmware?.price && (
                    <p className={styles.price}>От {correspondingFirmware.price} ₽</p>
                  )}
                  <p className={styles.countInfo}>{option.count} прошивок доступно</p>
                  <div className={styles.description}>
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
        <div className={styles.tuningSection}>
          <h3 className={styles.tuningSectionTitle}>Нет в наличии</h3>
          <div className={`${styles.contentGrid} ${styles.tuningGrid}`}>
            {unavailableOptions.map((option, index) => (
              <AnimatedCard
                key={option.id}
                delay={index * 40}
                className={`detailed ${styles.tuningOption} ${styles.unavailable}`}
              >
                <div className={`${styles.firmwareCountBadge} ${styles.unavailableBadge}`}>
                  0
                </div>
                <h3>{option.name}</h3>
                <p className={styles.category}>{option.category}</p>
                <p className={styles.unavailableText}>Нет в наличии</p>
                <div className={styles.description}>
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