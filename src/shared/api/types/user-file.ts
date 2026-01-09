// src/shared/api/types/user-file.ts
export type FileStatus = 'pending' | 'approved' | 'rejected';
export type TuningCategory = 
  | 'Stage1'
  | 'Stage2'
  | 'Stage3'
  | 'Stage4'
  | 'DPF Off'
  | 'EGR Off'
  | 'AdBlue Off'
  | 'TCU'
  | 'Custom';

export interface UserFile {
  id: number;
  name: string;
  description: string;
  fileName: string; // Обязательное поле
  fileSize: number;
  uploadDate: Date;
  status: FileStatus;
  statusUpdateDate?: Date;
  rejectionReason?: string;
  category: TuningCategory;
  brand: string;
  model: string;
  engine: string;
  version: string;
  downloadCount: number;
  rating: number;
  isPublic: boolean;
  author: string;
  originalHorsepower?: number;
  tunedHorsepower?: number;
  horsepowerGain?: number;
  originalTorque?: number;
  tunedTorque?: number;
  torqueGain?: number;
  fuelType?: string;
  fuelConsumptionChange?: string;
  requiredHardware: string[];
  compatibilityNotes?: string;
  changelog?: string;
  supportedECUs: string[];
  supportedYears?: string;
  transmissionType?: string;
  isEncrypted: boolean;
  requiresUnlockCode: boolean;
  recommendedTuningTools: string[];
  knownIssues?: string;
  installationInstructions?: string;
  testedVehicles: string[];
}

export interface UploadUserFileData {
  name: string;
  description: string;
  file: File;
  category: TuningCategory;
  brand: string;
  model: string;
  engine: string;
  version: string;
  fuelType: string;
  originalHorsepower?: number;
  tunedHorsepower?: number;
  originalTorque?: number;
  tunedTorque?: number;
  fuelConsumptionChange: string;
  requiredHardware: string[];
  compatibilityNotes: string;
  changelog: string;
  supportedECUs: string[];
  supportedYears: string;
  transmissionType: string;
  isEncrypted: boolean;
  requiresUnlockCode: boolean;
  recommendedTuningTools: string[];
  knownIssues: string;
  installationInstructions: string;
  testedVehicles: string[];
  author: string;
  isPublic: boolean;
}

export interface FileFilters {
  searchQuery: string;
  status: FileStatus | 'all';
  category: string[];
  //category: TuningCategory | 'all';
  brand: string;
  sortBy: 'newest' | 'oldest' | 'downloads' | 'rating';
  model?: string;
  generation?: string;
  engine?: string;
  categories?: string[];
}