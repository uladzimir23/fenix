// src/shared/lib/data/tuning-options/types.ts
export type CategoryKey = 
  | 'Stage1'
  | 'Stage2'
  | 'Stage3'
  | 'Stage4'
  | 'E85'
  | 'DPFoff'
  | 'EGRoff'
  | 'IMMOoff'
  | 'ADBLUEoff'
  | 'SAPoff'
  | 'EVAPoff'
  | 'Custom'
  | 'Eco'
  | 'Valet'
  | 'Race'
  | 'ST1'
  | 'Std'
  | 'E2';

export interface TuningOption {
  id: number;
  name: string;
  description: string;
  category: CategoryKey;
  engineCode: string;
}

// Добавьте этот тип для user-files
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