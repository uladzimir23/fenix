// src/shared/api/types/tuning.ts
export interface TuningOption {
    id: number;
    name: string;
    description?: string;
    category: string;
    price?: number;
    engineCode?: string;
    count?: number;
  }