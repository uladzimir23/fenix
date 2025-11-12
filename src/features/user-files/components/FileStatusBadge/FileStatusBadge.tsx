// src/features/user-files/components/FileStatusBadge/FileStatusBadge.tsx
import React, { useState } from 'react';
import { FileStatus } from '@/shared/api/types/user-file';
import { FaQuestionCircle } from 'react-icons/fa';
import Icon from '@/shared/ui/Icon/Icon';
import styles from './FileStatusBadge.module.scss';

interface FileStatusBadgeProps {
  status: FileStatus;
  rejectionReason?: string;
}

export const FileStatusBadge: React.FC<FileStatusBadgeProps> = ({ 
  status, 
  rejectionReason 
}) => {
  const [showTooltip, setShowTooltip] = useState(false);

  const getStatusConfig = (status: FileStatus) => {
    switch (status) {
      case 'pending':
        return {
          label: 'На проверке',
          className: styles.pending
        };
      case 'approved':
        return {
          label: 'Одобрено',
          className: styles.approved
        };
      case 'rejected':
        return {
          label: 'Отклонено',
          className: styles.rejected
        };
      default:
        return {
          label: status,
          className: styles.pending
        };
    }
  };

  const config = getStatusConfig(status);

  return (
    <div className={styles.statusBadgeContainer}>
      <span className={`${styles.statusBadge} ${config.className}`}>
        {config.label}
      </span>
      
      {status === 'rejected' && rejectionReason && (
        <div className={styles.tooltipContainer}>
          <Icon 
            icon={FaQuestionCircle} 
            className={styles.tooltipIcon}
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
          />
          {showTooltip && (
            <div className={styles.tooltip}>
              <div className={styles.tooltipContent}>
                <strong>Причина отказа:</strong>
                <p>{rejectionReason}</p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};