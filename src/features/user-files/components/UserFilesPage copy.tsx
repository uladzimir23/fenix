// src/features/user-files/components/UserFilesPage.tsx
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { UserFile, FileFilters } from '@/shared/api/types/user-file';
import { mockUserFiles, getUniqueCategories } from '@/shared/lib/data/user-files';
import { carBrands } from '@/shared/lib/data/car-data'; // Импортируем базу данных марок
import { UserFileFilters } from './UserFileFilters/UserFileFilters';
import { UserFileUploadForm } from './UserFileUploadForm/UserFileUploadForm';
import { PaginatedFilesGrid } from './PaginatedFilesGrid/PaginatedFilesGrid';
import { useUserFiles } from '../hooks/useUserFiles';
import styles from './UserFilesPage.module.scss';

export const UserFilesPage: React.FC = () => {
  const {
    files: allFiles,
    isLoading,
    error,
    addFile
  } = useUserFiles();

  const [filteredFiles, setFilteredFiles] = useState<UserFile[]>([]);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 12;
  
  const [filters, setFilters] = useState<FileFilters>({
    searchQuery: '',
    status: 'all',
    category: 'all',
    brand: 'all',
    sortBy: 'newest'
  });

  // Получаем все марки из базы данных
  const allBrands = useMemo(() => {
    return carBrands.map(brand => brand.name);
  }, []);

  const applyFilters = useCallback((files: UserFile[], filters: FileFilters): UserFile[] => {
    let filtered = [...files];

    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      filtered = filtered.filter(file => 
        file.name.toLowerCase().includes(query) ||
        file.description.toLowerCase().includes(query) ||
        file.brand.toLowerCase().includes(query) ||
        file.model.toLowerCase().includes(query) ||
        file.engine.toLowerCase().includes(query)
      );
    }

    if (filters.status !== 'all') {
      filtered = filtered.filter(file => file.status === filters.status);
    }

    if (filters.category !== 'all') {
      filtered = filtered.filter(file => file.category === filters.category);
    }

    if (filters.brand !== 'all') {
      filtered = filtered.filter(file => file.brand === filters.brand);
    }

    switch (filters.sortBy) {
      case 'newest':
        filtered.sort((a, b) => new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime());
        break;
      case 'oldest':
        filtered.sort((a, b) => new Date(a.uploadDate).getTime() - new Date(b.uploadDate).getTime());
        break;
      case 'downloads':
        filtered.sort((a, b) => b.downloadCount - a.downloadCount);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }

    return filtered;
  }, []);

  useEffect(() => {
    const filtered = applyFilters(allFiles, filters);
    setFilteredFiles(filtered);
    setCurrentPage(1);
  }, [allFiles, filters, applyFilters]);

  const handleUploadSuccess = (newFile: UserFile) => {
    addFile(newFile);
    setIsUploadModalOpen(false);
  };

  const handleDownload = useCallback((id: number) => {
    alert(`Файл с ID ${id} будет скачан`);
  }, []);

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleClearFilters = useCallback(() => {
    setFilters({
      searchQuery: '',
      status: 'all',
      category: 'all',
      brand: 'all',
      sortBy: 'newest'
    });
  }, []);

  const hasActiveFilters = useMemo(() => {
    return filters.searchQuery !== '' || 
           filters.status !== 'all' || 
           filters.category !== 'all' || 
           filters.brand !== 'all';
  }, [filters]);

  return (
    <div className={styles.userFilesPage}>
      <div className={styles.contentLayout}>
        <UserFileFilters
          filters={filters}
          onFiltersChange={setFilters}
          brands={allBrands} // Передаем все марки из базы данных
          categories={getUniqueCategories()}
        />

        <PaginatedFilesGrid
          files={filteredFiles}
          onDownload={handleDownload}
          currentPage={currentPage}
          pageSize={pageSize}
          onPageChange={handlePageChange}
          isLoading={isLoading}
          onClearAll={hasActiveFilters ? handleClearFilters : undefined}
          onUploadClick={() => setIsUploadModalOpen(true)}
        />
      </div>

      {error && (
        <div className={styles.error}>
          <p>{error}</p>
          <button onClick={() => window.location.reload()}>Попробовать снова</button>
        </div>
      )}

      {isUploadModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <button 
              className={styles.modalClose}
              onClick={() => setIsUploadModalOpen(false)}
            >
              ×
            </button>
            <UserFileUploadForm
              onSuccess={handleUploadSuccess}
              onCancel={() => setIsUploadModalOpen(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
};