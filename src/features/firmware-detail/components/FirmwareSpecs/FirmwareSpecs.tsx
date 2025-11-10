// src/features/firmware-detail/components/FirmwareSpecs/FirmwareSpecs.tsx
import React from 'react';
import { FirmwareFile } from '@/shared/api';
import styles from './FirmwareSpecs.module.scss';

interface FirmwareSpecsProps {
  firmware: FirmwareFile;
}

export const FirmwareSpecs: React.FC<FirmwareSpecsProps> = ({ firmware }) => {
  const specs = [
    { label: 'Марка:', value: firmware.brand },
    { label: 'Модель:', value: firmware.model },
    { label: 'Двигатель:', value: firmware.engine },
    { label: 'Тип топлива:', value: firmware.fuelType },
    { label: 'Категория:', value: firmware.category },
    { 
      label: 'Мощность (до/после):', 
      value: `${firmware.originalHorsepower} → ${firmware.tunedHorsepower} л.с.` 
    },
    { 
      label: 'Крутящий момент (до/после):', 
      value: `${firmware.originalTorque} → ${firmware.tunedTorque} Н·м` 
    },
    { 
      label: 'Прирост:', 
      value: `+${firmware.horsepowerGain} л.с. / +${firmware.torqueGain} Н·м` 
    },
    { 
      label: 'Изменение расхода:', 
      value: firmware.fuelConsumptionChange 
    },
  ];

  return (
    <div className={styles.specs}>
      <h3>Характеристики</h3>
      <div className={styles.specsGrid}>
        {specs.map((spec, index) => (
          <div key={index} className={styles.specItem}>
            <span className={styles.specLabel}>{spec.label}</span>
            <span className={styles.specValue}>{spec.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};