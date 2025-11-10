// src/shared/api/services/cars/cars.ts
import { apiClient } from '../../client/apiClient';
import { Car, CarCreationData } from '../../types/cars';

export const carsService = {
  getAll: () => apiClient.get<Car[]>('/cars').then(res => res.data),

  getById: (id: number) => apiClient.get<Car>(`/cars/${id}`).then(res => res.data),

  create: (carData: CarCreationData) =>
    apiClient.post<Car>('/cars', carData).then(res => res.data),

  getList: (ids: number[]) =>
    apiClient.post<Car[]>('/cars/list', { ids }).then(res => res.data),
    
  getBrands: () => 
    apiClient.get<string[]>('/cars/brands').then(res => res.data),
    
  getModelsByBrand: (brand: string) => 
    apiClient.get<string[]>(`/cars/models?brand=${brand}`).then(res => res.data),
    
  getEnginesByModel: (brand: string, model: string) => 
    apiClient.get<string[]>(`/cars/engines?brand=${brand}&model=${model}`).then(res => res.data),
};