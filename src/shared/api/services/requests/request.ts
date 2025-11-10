// src/shared/api/services/requests/request.ts
import { apiClient } from '../../client/apiClient';
import { Request, CreateRequestData } from '../../types/requests';
import { Car } from '../../types/cars';
import { TuningOption } from '../../types/tuning';

export const requestsService = {
  create: async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    const res = await apiClient
      .post<Request>('/requests', formData, {
        headers: {'Content-Type': 'multipart/form-data'},
      });
    return res.data;
  },

  getMy: () => apiClient.get<Request[]>('/requests/my').then(res => res.data),

  downloadSolution: (requestId: number) =>
    apiClient
      .get<Blob>(`/requests/${requestId}/solution`, {
        responseType: 'blob',
      })
      .then(res => res.data),
};