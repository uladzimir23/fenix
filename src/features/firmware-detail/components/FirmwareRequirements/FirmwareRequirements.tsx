// src/features/firmware-detail/components/FirmwareRequirements/FirmwareRequirements.tsx
import React from 'react';
import { FirmwareFile } from '@/shared/api';
import styles from './FirmwareRequirements.module.scss';

interface FirmwareRequirementsProps {
  firmware: FirmwareFile;
}

export const FirmwareRequirements: React.FC<FirmwareRequirementsProps> = ({ 
  firmware 
}) => {
  if (!firmware.requiredHardware?.length) return null;

  return (
    <div className={styles.requirements}>
      <h3>Необходимое оборудование</h3>
      <ul>
        {firmware.requiredHardware.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
};