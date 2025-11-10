// src/shared/api/hooks/useApi.ts
import { useCallback } from 'react';
import { tokenStorage } from '../client/apiClient';

export const useApi = () => {
  const setAuthToken = useCallback((token: string) => {
    tokenStorage.setAccessToken(token);
  }, []);

  const clearAuth = useCallback(() => {
    tokenStorage.clear();
  }, []);

  const isAuthenticated = useCallback(() => {
    return !!tokenStorage.getAccessToken();
  }, []);

  return {
    setAuthToken,
    clearAuth,
    isAuthenticated,
  };
};