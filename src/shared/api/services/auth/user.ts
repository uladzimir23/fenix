// src/shared/api/services/auth/user.ts
import { apiClient } from '../../client/apiClient';
import { UserProfile } from '../../types/auth';

export const userService = {
  getProfile: () =>
    apiClient.get<UserProfile>('/users/me/profile').then(res => res.data),

  register: (userData: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
  }) => apiClient.post<UserProfile>('/users', userData).then(res => res.data),

  requestPasswordReset: (email: string) =>
    apiClient
      .post('/users/request-password-reset', { email })
      .then(res => res.data),

  resetPassword: (token: string, newPassword: string) =>
    apiClient
      .post('/users/reset-password', { token, newPassword })
      .then(res => res.data),
};