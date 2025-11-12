// src/features/user-files/hooks/useUserFiles.ts
import { useState, useEffect } from 'react';
import { UserFile } from '@/shared/api/types/user-file';
import { mockUserFiles } from '@/shared/lib/data/user-files';

export const useUserFiles = () => {
  const [files, setFiles] = useState<UserFile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadFiles();
  }, []);

  const loadFiles = async () => {
    try {
      setIsLoading(true);
      // Имитация API вызова
      setTimeout(() => {
        setFiles(mockUserFiles);
        setIsLoading(false);
      }, 1000);
    } catch (err) {
      setError('Ошибка при загрузке файлов');
      setIsLoading(false);
      console.error('Error loading user files:', err);
    }
  };

  const addFile = (newFile: UserFile) => {
    setFiles(prev => [newFile, ...prev]);
  };

  const updateFile = (id: number, updates: Partial<UserFile>) => {
    setFiles(prev => prev.map(file => 
      file.id === id ? { ...file, ...updates } : file
    ));
  };

  const deleteFile = (id: number) => {
    setFiles(prev => prev.filter(file => file.id !== id));
  };

  return {
    files,
    isLoading,
    error,
    addFile,
    updateFile,
    deleteFile,
    refetch: loadFiles
  };
};