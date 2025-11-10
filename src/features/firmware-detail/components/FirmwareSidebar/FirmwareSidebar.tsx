// src/features/firmware-detail/components/FirmwareSidebar/FirmwareSidebar.tsx
import React from 'react';
import { FirmwareFile } from '@/shared/api';
import styles from './FirmwareSidebar.module.scss';

interface FirmwareSidebarProps {
  firmware: FirmwareFile;
}

export const FirmwareSidebar: React.FC<FirmwareSidebarProps> = ({ firmware }) => {
  return (
    <div className={styles.sidebar}>
      {/* Author Info */}
      <div className={styles.sidebarCard}>
        <div className={styles.authorInfo}>
          <h3>Автор</h3>
          <p>{firmware.author || 'Не указан'}</p>
        </div>
      </div>

      {/* File Info */}
      <div className={styles.sidebarCard}>
        <div className={styles.fileInfo}>
          <h3>Информация о файле</h3>
          <div className={styles.fileDetails}>
            <span>Размер:</span>
            <span>{firmware.fileSize} MB</span>
          </div>
          <div className={styles.fileDetails}>
            <span>Имя файла:</span>
            <span>{firmware.fileName}</span>
          </div>
          <div className={styles.fileDetails}>
            <span>Статус:</span>
            <span>{firmware.status === 'verified' ? 'Проверено' : 'На проверке'}</span>
          </div>
          <div className={styles.fileDetails}>
            <span>Обновлено:</span>
            <span>{firmware.lastUpdated.toLocaleDateString()}</span>
          </div>
        </div>
      </div>

      {/* Recommended Tools */}
      {firmware.recommendedTuningTools && firmware.recommendedTuningTools.length > 0 && (
        <div className={styles.sidebarCard}>
          <div className={styles.toolsInfo}>
            <h3>Рекомендуемые инструменты</h3>
            <ul>
              {firmware.recommendedTuningTools.map((tool, index) => (
                <li key={index}>{tool}</li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Known Issues */}
      {firmware.knownIssues && (
        <div className={styles.sidebarCard}>
          <div className={styles.knownIssues}>
            <h3>Известные проблемы</h3>
            <p>{firmware.knownIssues}</p>
          </div>
        </div>
      )}

      {/* Installation Instructions */}
      {firmware.installationInstructions && (
        <div className={styles.sidebarCard}>
          <div className={styles.installationInfo}>
            <h3>Инструкция по установке</h3>
            <p>{firmware.installationInstructions}</p>
          </div>
        </div>
      )}
    </div>
  );
};