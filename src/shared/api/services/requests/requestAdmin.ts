// src/shared/api/services/requests/requestAdmin.ts
import { apiClient } from '../../client/apiClient';
import { Request } from '../../types/requests';

export const requestAdminService = {
  getAll: () => apiClient.get<Request[]>('/requests/admin').then(res => res.data),

  downloadRequestFile: (requestId: number) =>
    apiClient
      .get<Blob>(`/requests/admin/${requestId}/file`, {
        responseType: 'blob',
      })
      .then(res => res.data),

  updateStatus: (id: number, status: string) =>
    apiClient
      .put<Request>(`/requests/admin/${id}/status`, { status })
      .then(res => res.data),

  uploadSolution: (id: number, file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    return apiClient
      .post<Request>(`/requests/admin/${id}/solution`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        timeout: 300_000,
      })
      .then(res => res.data);
  },
};