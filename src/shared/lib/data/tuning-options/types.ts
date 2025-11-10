// src/shared/lib/data/tuning-options/types.ts
export interface TuningOption {
    id: number;
    name: string;
    description: string;
    category: string;
    engineCode: string;
  }
  
  export type CategoryKey = 'Stage1' | 'Stage2' | 'Stage3' | 'E85' | 'DPFoff' | 'EGRoff' | 'IMMOoff' | 
    'ADBLUEoff' | 'SAPoff' | 'EVAPoff' | 'Custom' | 'Eco' | 'Valet' | 'Race' | 'ST1' | 'Std' | 'E2';
  
  export interface CategoryDescription {
    [key: string]: string;
  }