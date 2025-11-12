// src/features/user-files/components/UserFileCard/UserFileCard.tsx
import React, { memo } from 'react';
import { UserFile } from '@/shared/api/types/user-file';
import { FileStatusBadge } from '../FileStatusBadge/FileStatusBadge';
import { FaCalendar, FaSync, FaDownload, FaInfoCircle } from 'react-icons/fa';
import Icon from '@/shared/ui/Icon/Icon';
import styles from './UserFileCard.module.scss';

interface UserFileCardProps {
  file: UserFile;
  onDownload: (id: number) => void;
}

export const UserFileCard = memo<UserFileCardProps>(({ file, onDownload }) => {
  const formatFileSize = (size: number): string => {
    return `${size} MB`;
  };

  const formatDate = (date: Date): string => {
    return new Date(date).toLocaleDateString('ru-RU');
  };

  return (
    <div className={styles.userFileCard}>
      <div className={styles.cardHeader}>
        <div className={styles.fileInfo}>
          <h3 className={styles.fileName}>{file.name}</h3>
          <div className={styles.statusContainer}>
            <FileStatusBadge 
              status={file.status} 
              rejectionReason={file.rejectionReason}
            />
          </div>
        </div>
        <div className={styles.fileMeta}>
          <span className={styles.version}>v{file.version}</span>
          <span className={styles.fileSize}>{formatFileSize(file.fileSize)}</span>
        </div>
      </div>

      <div className={styles.cardContent}>
        <p className={styles.description}>{file.description}</p>
        
        <div className={styles.vehicleInfo}>
          <span className={styles.brandModel}>{file.brand} {file.model}</span>
          <span className={styles.engine}>{file.engine}</span>
          <span className={styles.category}>{file.category}</span>
        </div>


      </div>

      <div className={styles.cardFooter}>
        <div className={styles.footerMeta}>
          <div className={styles.stats}>
            <div className={styles.stat}>
            <span className={styles.statValue}>★ {file.rating}</span>
            <span className={styles.statValue}>📥 {file.downloadCount}</span>
            </div>
          </div>


        
          <div className={styles.dates}>
            <div className={styles.dateItem}>
              <Icon icon={FaCalendar} className={styles.dateIcon} />
              <span>{formatDate(file.uploadDate)}</span>
            </div>
            {file.statusUpdateDate && (
              <div className={styles.dateItem}>
                <Icon icon={FaSync} className={styles.dateIcon} />
                <span>{formatDate(file.statusUpdateDate)}</span>
              </div>
            )}
          </div>
        </div>
        
        <div className={styles.actions}>
          {file.status === 'approved' && (
            <button 
              className={styles.downloadButton}
              onClick={() => onDownload(file.id)}
            >
              <Icon icon={FaDownload} className={styles.buttonIcon} />
              Скачать
            </button>
          )}
          <button className={styles.detailsButton}>
            <Icon icon={FaInfoCircle} className={styles.buttonIcon} />
            Подробнее
          </button>
        </div>
      </div>
    </div>
  );
});

UserFileCard.displayName = 'UserFileCard';