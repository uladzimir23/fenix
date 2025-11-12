import React from 'react';
import { FirmwareFile } from '@/shared/api';
import { CarBrand, CarModel, Generation } from '@/shared/lib/data';
import { AnimatedCard } from '../../AnimatedCard/AnimatedCard';
import styles from './FirmwareGrid.module.scss';

interface FirmwareGridProps {
  firmwareFiles: FirmwareFile[];
  otherFirmwareFiles: FirmwareFile[];
  onFirmwareSelect: (firmware: FirmwareFile) => void;
  selectedBrand: CarBrand | null;
  selectedModel: CarModel | null;
  selectedGeneration: Generation | null;
  selectedEngine: string | null;
}

export const FirmwareGrid: React.FC<FirmwareGridProps> = ({
  firmwareFiles,
  otherFirmwareFiles,
  onFirmwareSelect,
  selectedBrand,
  selectedModel,
  selectedGeneration,
  selectedEngine
}) => {
  return (
    <div className={styles.firmwareContainer}>
      <h3 className={styles.tuningSectionTitle}>Доступные прошивки</h3>
      <div className={`${styles.contentGrid} ${styles.tuningGrid}`}>
        {firmwareFiles.map((firmware, index) => (
          <AnimatedCard
            key={firmware.id}
            delay={index * 30}
            className="firmwareOption"
            onClick={() => onFirmwareSelect(firmware)}
          >
            <div className={styles.firmwareWrapper}>
              <div className={styles.firmwareHeaderWrapper}>
                <div className={styles.firmwareHeaderContainer}>
                  <div className={styles.firmwareHeader}>
                    <h3>{firmware.name}</h3>
                    <span className={styles.firmwareVersion}>{firmware.version}</span>
                    <p className={styles.category}>{firmware.category}</p>

                  </div>
                </div>
                {firmware.price && (
                  <p className={styles.price}>Цена: {firmware.price} ₽</p>
                )}
              </div>
              <div className={styles.firmwareStats}>
                <div className={styles.stat}>
                  <span className={styles.statLabel}>Мощность:</span>
                  <span className={styles.statValue}>{firmware.originalHorsepower} → {firmware.tunedHorsepower} л.с.</span>
                </div>
                <div className={styles.stat}>
                  <span className={styles.statLabel}>Крутящий момент:</span>
                  <span className={styles.statValue}>{firmware.originalTorque} → {firmware.tunedTorque} Н·м</span>
                </div>
                <div className={styles.stat}>
                  <span className={styles.statLabel}>Прирост:</span>
                  <span className={styles.statValue}>+{firmware.horsepowerGain} л.с. / +{firmware.torqueGain} Н·м</span>
                </div>
              </div>
            </div>
            <p className={styles.description}>{firmware.description.substring(0, 250)}...</p>
            <div className={styles.firmwareMeta}>
              <span className={styles.rating}>★ {firmware.rating}</span>
              <span className={styles.downloads}>📥 {firmware.downloadCount}</span>
              <span className={styles.date}>{firmware.uploadDate.toLocaleDateString()}</span>
            </div>
          </AnimatedCard>
        ))}
      </div>
      
      {otherFirmwareFiles.length > 0 && (
        <div className={styles.otherFirmwaresSection}>
          <h3 className={styles.otherFirmwaresTitle}>
            Другие прошивки на {selectedBrand?.name} {selectedModel?.name} {selectedGeneration?.body} {selectedEngine}
          </h3>
          <div className={`${styles.contentGrid} ${styles.tuningGrid}`}>
            {otherFirmwareFiles.map((firmware, index) => (
              <AnimatedCard
                key={firmware.id}
                delay={index * 40}
                className="firmwareOption"
                onClick={() => onFirmwareSelect(firmware)}
              >
                <div className={styles.firmwareWrapper}>
                  <div className={styles.firmwareHeaderWrapper}>
                    <div className={styles.firmwareHeaderContainer}>
                      <div className={styles.firmwareHeader}>
                        <h3>{firmware.name}</h3>
                        <span className={styles.firmwareVersion}>{firmware.version}</span>
                        <p className={styles.category}>{firmware.category}</p>
                      </div>
                    </div>
                    {firmware.price && (
                      <p className={styles.price}>Цена: {firmware.price} ₽</p>
                    )}
                  </div>
                  <div className={styles.firmwareStats}>
                    <div className={styles.stat}>
                      <span className={styles.statLabel}>Мощность:</span>
                      <span className={styles.statValue}>{firmware.originalHorsepower} → {firmware.tunedHorsepower} л.с.</span>
                    </div>
                    <div className={styles.stat}>
                      <span className={styles.statLabel}>Прирост:</span>
                      <span className={styles.statValue}>+{firmware.horsepowerGain} л.с.</span>
                    </div>
                  </div>
                </div>
                <p className={styles.description}>{firmware.description.substring(0, 250)}...</p>
                <div className={styles.firmwareMeta}>
                  <span className={styles.rating}>★ {firmware.rating}</span>
                  <span className={styles.downloads}>📥 {firmware.downloadCount}</span>
                </div>
              </AnimatedCard>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};