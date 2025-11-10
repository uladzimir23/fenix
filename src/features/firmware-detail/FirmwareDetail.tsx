// src/features/firmware-detail/FirmwareDetail.tsx
import React from 'react';
import { FirmwareFile } from '@/shared/api';
import { useFirmwareDetail } from './hooks/useFirmwareDetail';
import { FirmwareHeader } from './components/FirmwareHeader/FirmwareHeader';
import { FirmwareSpecs } from './components/FirmwareSpecs/FirmwareSpecs';
import { FirmwareRequirements } from './components/FirmwareRequirements/FirmwareRequirements';
import { FirmwareSidebar } from './components/FirmwareSidebar/FirmwareSidebar';
import styles from './FirmwareDetail.module.scss';

interface FirmwareDetailProps {
  firmware: FirmwareFile;
  onClose: () => void;
  onBuy: (firmware: FirmwareFile) => void;
}

export const FirmwareDetail: React.FC<FirmwareDetailProps> = ({
  firmware,
  onClose,
  onBuy
}) => {
  const { animation, handleClose } = useFirmwareDetail(onClose);

  const handleBuyClick = () => {
    onBuy(firmware);
  };

  const modalClass = `
    ${styles.modal} 
    ${animation.isVisible ? styles.visible : ''} 
    ${animation.isClosing ? styles.closing : ''}
  `;

  const overlayClass = `
    ${styles.overlay} 
    ${animation.isVisible ? styles.visible : ''} 
    ${animation.isClosing ? styles.closing : ''}
  `;

  return (
    <div className={overlayClass}>
      <div className={modalClass}>
        <FirmwareHeader
          firmware={firmware}
          onClose={handleClose}
          onBuy={handleBuyClick}
        />

        <div className={styles.content}>
          <div className={styles.mainContent}>
            <div className={styles.mainCard}>
              {/* Description */}
              <div className={styles.description}>
                <h3>Описание</h3>
                <p>{firmware.description}</p>
              </div>

              {/* Specifications */}
              <FirmwareSpecs firmware={firmware} />

              {/* Requirements */}
              {firmware.requiredHardware && firmware.requiredHardware.length > 0 && (
                <FirmwareRequirements firmware={firmware} />
              )}

              {/* Compatibility */}
              {firmware.compatibilityNotes && (
                <div className={styles.compatibility}>
                  <h3>Совместимость</h3>
                  <p>{firmware.compatibilityNotes}</p>
                </div>
              )}

              {/* Changelog */}
              {firmware.changelog && (
                <div className={styles.changelog}>
                  <h3>История изменений</h3>
                  <pre>{firmware.changelog}</pre>
                </div>
              )}
            </div>
          </div>

          <FirmwareSidebar firmware={firmware} />
        </div>
      </div>
    </div>
  );
};