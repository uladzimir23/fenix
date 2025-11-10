// src/shared/api/services/auth/sessions.ts
import { apiClient, tokenStorage } from '../../client/apiClient';
import { LoginCredentials, LoginResponse } from '../../types/auth';

export const sessionsService = {
  login: (credentials: LoginCredentials) =>
    apiClient
      .post<LoginResponse>('/sessions/auth', credentials)
      .then(res => res.data),

  logout: () => {
    const refreshToken = tokenStorage.getRefreshToken();
    return apiClient.delete('/sessions', {
      headers: refreshToken ? {
        'Authorization': `Bearer ${refreshToken}`
      } : {}
    }).then(res => res.data);
  },

  refreshTokens: () => {
    const refreshToken = tokenStorage.getRefreshToken();
    if (!refreshToken) {
      throw new Error('No refresh token available');
    }

    return apiClient.post<LoginResponse>('/sessions/tokens', {}, {
      headers: {
        'Authorization': `Bearer ${refreshToken}`
      }
    }).then(res => res.data);
  },
};