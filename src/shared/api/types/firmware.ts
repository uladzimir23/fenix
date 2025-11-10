// src/shared/api/types/firmware.ts
export interface FirmwareFile {
    id: number;
    name: string;
    description: string;
    uploadDate: Date;
    version: string;
    brand: string;
    model: string;
    engine: string;
    category: string;
    fileSize: number;
    downloadCount: number;
    rating: number;
    isPublic: boolean;
    price?: number;
    horsepowerGain?: number;
    torqueGain?: number;
    fuelType: string;
    requiredHardware?: string[];
    compatibilityNotes?: string;
    changelog?: string;
    author?: string;
    supportedECUs: string[];
    status: 'verified' | 'pending' | 'rejected';
    lastUpdated: Date;
    originalHorsepower?: number;
    tunedHorsepower?: number;
    originalTorque?: number;
    tunedTorque?: number;
    fuelConsumptionChange?: string;
    supportedYears?: string;
    transmissionType?: string;
    fileName: string;
    checksum?: string;
    isEncrypted: boolean;
    requiresUnlockCode: boolean;
    recommendedTuningTools?: string[];
    knownIssues?: string;
    installationInstructions?: string;
    testedVehicles?: string[];
  }
  
  export interface UploadFirmwareData {
    name: string;
    description: string;
    version: string;
    brand: string;
    model: string;
    engine: string;
    category: string;
    file: File;
    fuelType: string;
    originalHorsepower?: number;
    tunedHorsepower?: number;
    originalTorque?: number;
    tunedTorque?: number;
    horsepowerGain?: number;
    torqueGain?: number;
    fuelConsumptionChange?: string;
    supportedECUs: string[];
    supportedYears?: string;
    transmissionType?: string;
    compatibilityNotes?: string;
    testedVehicles?: string[];
    requiredHardware?: string[];
    recommendedTuningTools?: string[];
    changelog?: string;
    author?: string;
    knownIssues?: string;
    installationInstructions?: string;
    isEncrypted: boolean;
    requiresUnlockCode: boolean;
  }
  
  export const FirmwareStatus = {
    VERIFIED: 'verified',
    PENDING: 'pending',
    REJECTED: 'rejected'
  } as const;
  
  export type FirmwareStatusType = typeof FirmwareStatus[keyof typeof FirmwareStatus];