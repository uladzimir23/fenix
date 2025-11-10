// src/shared/api/index.ts
// Главный файл экспорта API - реэкспортируем все с правильными именами
export * from './services';

// Явно реэкспортируем основные типы с правильными именами
export type { 
  UserProfile, 
  LoginCredentials, 
  LoginResponse 
} from './types/auth';

export type { 
  Car, 
  CarCreationData 
} from './types/cars';

export type { 
  FirmwareFile, 
  UploadFirmwareData, 
  FirmwareStatusType 
} from './types/firmware';

export type { 
  Request, 
  CreateRequestData 
} from './types/requests';

export type { 
  TuningOption 
} from './types/tuning';

// Экспортируем клиент и утилиты
export { apiClient, tokenStorage } from './client/apiClient';