// src/shared/lib/data/firmware/types.ts
import { FirmwareFile, UploadFirmwareData } from '@/shared/api';

export type CategoryKey = 'Stage1' | 'Stage2' | 'Stage3' | 'E85' | 'DPFoff' | 'EGRoff' | 'IMMOoff' | 
  'ADBLUEoff' | 'SAPoff' | 'EVAPoff' | 'Custom' | 'Eco' | 'Valet' | 'Race' | 'ST1' | 'Std' | 'E2';

export interface CategoryDescription {
  [key: string]: string;
}

export interface FirmwareFilters {
  brand?: string;
  model?: string;
  engine?: string;
  category?: string;
  searchQuery?: string;
}

export interface FirmwareStats {
  total: number;
  byBrand: Record<string, number>;
  byCategory: Record<string, number>;
  byModel: Record<string, number>;
}