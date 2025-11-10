// src/shared/api/services/index.ts
// Экспорт сервисов
export { carsService } from './cars/cars';
export { requestsService } from './requests/request';
export { requestAdminService } from './requests/requestAdmin';
export { sessionsService } from './auth/sessions';
export { tuningOptionsService } from './tuning/tuningOptions';
export { userService } from './auth/user';
export { firmwareService } from './firmware/firmwareService';

// Экспорт типов - ЯВНО переименовываем конфликтующие типы
export type { Car, CarCreationData } from '../types/cars';
export type { Request, CreateRequestData } from '../types/requests';
export type { LoginCredentials, LoginResponse, UserProfile } from '../types/auth';
export type { TuningOption } from '../types/tuning';

// Явно реэкспортируем firmware типы чтобы избежать конфликта
export type { 
  FirmwareFile as SharedFirmwareFile, 
  UploadFirmwareData as SharedUploadFirmwareData,
  FirmwareStatusType 
} from '../types/firmware';