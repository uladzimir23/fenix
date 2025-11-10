// src/shared/api/test/api-test.ts
import { apiClient } from '../client/apiClient';

export const testApiConnection = async () => {
  try {
    // Простой тестовый запрос
    const response = await apiClient.get('/');
    console.log('API connection successful:', response.status);
    return true;
  } catch (error) {
    console.log('API connection failed. This is normal in development.');
    return false;
  }
};