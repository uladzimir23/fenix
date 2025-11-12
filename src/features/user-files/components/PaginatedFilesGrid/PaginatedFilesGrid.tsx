// src/features/user-files/components/PaginatedFilesGrid/PaginatedFilesGrid.tsx
import React, { useRef, useState, useEffect } from 'react';
import { UserFile } from '@/shared/api/types/user-file';
import { UserFileCard } from '../UserFileCard/UserFileCard';
import styles from './PaginatedFilesGrid.module.scss';

interface PaginatedFilesGridProps {
  files: UserFile[];
  onDownload: (id: number) => void;
  currentPage: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  isLoading?: boolean;
  onClearAll?: () => void;
  onUploadClick?: () => void;
}

export const PaginatedFilesGrid: React.FC<PaginatedFilesGridProps> = ({
  files,
  onDownload,
  currentPage,
  pageSize,
  onPageChange,
  isLoading = false,
  onClearAll,
  onUploadClick
}) => {
  const resultsContentRef = useRef<HTMLDivElement>(null);
  const [hasScroll, setHasScroll] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);

  const totalPages = Math.ceil(files.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentFiles = files.slice(startIndex, endIndex);

  useEffect(() => {
    const checkScroll = () => {
      if (resultsContentRef.current) {
        const { scrollHeight, clientHeight } = resultsContentRef.current;
        setHasScroll(scrollHeight > clientHeight);
      }
    };

    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, [files, currentFiles]);

  const handleScroll = () => {
    if (!isScrolling) {
      setIsScrolling(true);
    }

    clearTimeout((window as any).scrollTimeout);
    (window as any).scrollTimeout = setTimeout(() => {
      setIsScrolling(false);
    }, 150);
  };

  if (isLoading) {
    return (
      <div className={styles.paginatedGrid}>
        <div className={styles.loading}>
          <div className={styles.spinner}></div>
          <p>Загрузка файлов...</p>
        </div>
      </div>
    );
  }

  if (files.length === 0) {
    return (
      <div className={styles.paginatedGrid}>
        <div className={styles.resultsHeader}>
          <h2>Мои файлы прошивок</h2>
          <div className={styles.headerActions}>
            {onClearAll && (
              <button className={styles.clearResults} onClick={onClearAll}>
                Очистить фильтры
              </button>
            )}
            {onUploadClick && (
              <button 
                className={styles.uploadButton}
                onClick={onUploadClick}
              >
                Загрузить файл
              </button>
            )}
          </div>
        </div>
        <div className={styles.noResults}>
          <p>Файлы не найдены. Попробуйте изменить параметры поиска.</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.paginatedGrid}>
      <div className={styles.resultsHeader}>
        <h2>Мои файлы прошивок</h2>
        <div className={styles.headerActions}>
        {onUploadClick && (
            <button 
              className={styles.uploadButton}
              onClick={onUploadClick}
            >
              Загрузить файл
            </button>
          )}
          {onClearAll && (
            <button className={styles.clearResults} onClick={onClearAll}>
              Очистить фильтры
            </button>
          )}
        </div>
      </div>

      <div 
        className={`${styles.resultsContent} ${
          hasScroll ? styles.hasScroll : styles.noScroll
        } ${isScrolling ? styles.scrolling : ''}`}
        ref={resultsContentRef}
        onScroll={handleScroll}
      >
        {hasScroll && <div className={`${styles.fadeOverlay} ${styles.topFade}`}></div>}
        
        <div className={styles.filesGrid}>
          {currentFiles.map(file => (
            <UserFileCard
              key={file.id}
              file={file}
              onDownload={onDownload}
            />
          ))}
        </div>
        
        {hasScroll && <div className={`${styles.fadeOverlay} ${styles.bottomFade}`}></div>}
      </div>

      {totalPages > 1 && (
        <div className={styles.pagination}>
          <button
            disabled={currentPage === 1}
            onClick={() => onPageChange(currentPage - 1)}
            className={styles.paginationButton}
          >
            ← Назад
          </button>
          
          <div className={styles.pageNumbers}>
            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter(page => {
                return (
                  page === 1 ||
                  page === totalPages ||
                  Math.abs(page - currentPage) <= 1
                );
              })
              .map((page, index, array) => {
                const prevPage = array[index - 1];
                if (prevPage && page - prevPage > 1) {
                  return (
                    <React.Fragment key={`ellipsis-${page}`}>
                      <span className={styles.ellipsis}>...</span>
                      <button
                        onClick={() => onPageChange(page)}
                        className={`${styles.pageButton} ${
                          currentPage === page ? styles.active : ''
                        }`}
                      >
                        {page}
                      </button>
                    </React.Fragment>
                  );
                }
                return (
                  <button
                    key={page}
                    onClick={() => onPageChange(page)}
                    className={`${styles.pageButton} ${
                      currentPage === page ? styles.active : ''
                    }`}
                  >
                    {page}
                  </button>
                );
              })}
          </div>
          
          <button
            disabled={currentPage === totalPages}
            onClick={() => onPageChange(currentPage + 1)}
            className={styles.paginationButton}
          >
            Вперед →
          </button>
        </div>
      )}
      
      <div className={styles.paginationInfo}>
        Показано {startIndex + 1}-{Math.min(endIndex, files.length)} из {files.length} файлов
      </div>
    </div>
  );
};