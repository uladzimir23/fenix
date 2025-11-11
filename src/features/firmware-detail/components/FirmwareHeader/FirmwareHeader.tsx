// src/features/firmware-detail/components/FirmwareHeader/FirmwareHeader.tsx
import React from 'react';
import { FirmwareFile } from '@/shared/api';
import { Button } from '@/shared/ui/Button/Button';
import { Icon } from '@/shared/ui/Icon/Icon';
import { FaTimes } from 'react-icons/fa';
import styles from './FirmwareHeader.module.scss';

interface FirmwareHeaderProps {
  firmware: FirmwareFile;
  onClose: () => void;
  onBuy: () => void;
}

export const FirmwareHeader: React.FC<FirmwareHeaderProps> = ({
  firmware,
  onClose,
  onBuy
}) => {
  return (
    <div className={styles.header}>
      <div className={styles.headerContent}>
        {firmware.price && (
          <div className={styles.priceSection}>
            <span className={styles.price}>{firmware.price} ₽</span>
            <Button
              variant="primary"
              className={styles.buyButton}
              onClick={onBuy}
            >
              Купить
            </Button>
          </div>
        )}
        
        <div className={styles.metaSection}>
          <div className={styles.categoryBadgeWrapper}>
            <span className={styles.categoryBadge}>{firmware.category}</span>
            
            <div className={styles.metaInfo}>
              <div className={styles.carInfo}>
                {firmware.brand} {firmware.model} • {firmware.engine}
              </div>

              <div className={styles.firmwareMeta}>
                <span className={styles.version}>Версия: {firmware.version}</span>
                <span className={styles.rating}>★ {firmware.rating}</span>
                <span className={styles.downloads}>📥 {firmware.downloadCount}</span>
              </div>
            </div>
          </div>
          <h2 className={styles.title}>{firmware.name}</h2>  
        </div>
      </div>
      
      <button className={styles.closeButton} onClick={onClose}>
        <Icon 
          icon={FaTimes}
          size='lg'
        />
      </button>
    </div>
  );
};