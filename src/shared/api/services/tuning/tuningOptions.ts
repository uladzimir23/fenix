// src/shared/api/services/tuning/tuningOptions.ts
import { apiClient } from '../../client/apiClient';
import { TuningOption } from '../../types/tuning';



export const tuningOptionsService = {
  getAll: () =>
    apiClient.get<TuningOption[]>('/tuning-options').then(res => res.data),

  create: (data: Omit<TuningOption, 'id'>) =>
    apiClient.post<TuningOption>('/tuning-options', data).then(res => res.data),

  update: (id: number, data: Partial<TuningOption>) =>
    apiClient.put<TuningOption>(`/tuning-options/${id}`, data).then(res => res.data),

  delete: (id: number) =>
    apiClient.delete(`/tuning-options/${id}`).then(res => res.data),
};