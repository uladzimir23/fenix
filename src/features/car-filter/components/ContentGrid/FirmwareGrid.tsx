// src/features/car-filter/components/ContentGrid/FirmwareGrid.tsx
import React from 'react';
import { FirmwareFile } from '@/shared/api';
import { CarBrand, CarModel, Generation } from '@/shared/lib/data';
import { AnimatedCard } from '../AnimatedCard/AnimatedCard';

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
    <div className='firmware-container'>
      <h3 className="tuning-section-title">Доступные прошивки</h3>
      <div className="content-grid tuning-grid">
        {firmwareFiles.map((firmware, index) => (
          <AnimatedCard
            key={firmware.id}
            delay={index * 30}
            className="detailed firmware-option"
            onClick={() => onFirmwareSelect(firmware)}
          >
            <div className='firmware-wrapper'>
              <div className='firmware-header-wrapper'>
                <div className='firmware-header-container'>
                  <div className="firmware-header">
                    <h3>{firmware.name}</h3>
                    <span className="firmware-version">{firmware.version}</span>
                  </div>
                  <p className="category">{firmware.category}</p>
                </div>
                {firmware.price && (
                  <p className="price">Цена: {firmware.price} ₽</p>
                )}
              </div>
              <div className="firmware-stats">
                <div className="stat">
                  <span className="stat-label">Мощность:</span>
                  <span className="stat-value">{firmware.originalHorsepower} → {firmware.tunedHorsepower} л.с.</span>
                </div>
                <div className="stat">
                  <span className="stat-label">Крутящий момент:</span>
                  <span className="stat-value">{firmware.originalTorque} → {firmware.tunedTorque} Н·м</span>
                </div>
                <div className="stat">
                  <span className="stat-label">Прирост:</span>
                  <span className="stat-value">+{firmware.horsepowerGain} л.с. / +{firmware.torqueGain} Н·м</span>
                </div>
              </div>
            </div>
            <p className="description">{firmware.description.substring(0, 250)}...</p>
            <div className="firmware-meta">
              <span className="rating">★ {firmware.rating}</span>
              <span className="downloads">📥 {firmware.downloadCount}</span>
              <span className="date">{firmware.uploadDate.toLocaleDateString()}</span>
            </div>
          </AnimatedCard>
        ))}
      </div>
      
      {otherFirmwareFiles.length > 0 && (
        <div className="other-firmwares-section">
          <h3 className="other-firmwares-title">
            Другие прошивки на {selectedBrand?.name} {selectedModel?.name} {selectedGeneration?.body} {selectedEngine}
          </h3>
          <div className="content-grid tuning-grid">
            {otherFirmwareFiles.map((firmware, index) => (
              <AnimatedCard
                key={firmware.id}
                delay={index * 40}
                className="detailed firmware-option"
                onClick={() => onFirmwareSelect(firmware)}
              >
                <div className='firmware-wrapper'>
                  <div className='firmware-header-wrapper'>
                    <div className='firmware-header-container'>
                      <div className="firmware-header">
                        <h3>{firmware.name}</h3>
                        <span className="firmware-version">{firmware.version}</span>
                      </div>
                      <p className="category">{firmware.category}</p>
                    </div>
                    {firmware.price && (
                      <p className="price">Цена: {firmware.price} ₽</p>
                    )}
                  </div>
                  <div className="firmware-stats">
                    <div className="stat">
                      <span className="stat-label">Мощность:</span>
                      <span className="stat-value">{firmware.originalHorsepower} → {firmware.tunedHorsepower} л.с.</span>
                    </div>
                    <div className="stat">
                      <span className="stat-label">Прирост:</span>
                      <span className="stat-value">+{firmware.horsepowerGain} л.с.</span>
                    </div>
                  </div>
                </div>
                <p className="description">{firmware.description.substring(0, 250)}...</p>
                <div className="firmware-meta">
                  <span className="rating">★ {firmware.rating}</span>
                  <span className="downloads">📥 {firmware.downloadCount}</span>
                </div>
              </AnimatedCard>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};