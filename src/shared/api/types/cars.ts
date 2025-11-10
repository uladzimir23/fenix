// src/shared/api/types/cars.ts
export interface Car {
    id: number;
    brand: string;
    model: string;
    year: number;
    engine: string;
    generation?: string;
    horsepower?: number;
    torque?: number;
    fuelType?: string;
    transmission?: string;
    ecuModel?: string;
  }
  
  export interface CarCreationData {
    brand: string;
    model: string;
    year: number;
    engine: string;
    generation?: string;
    horsepower?: number;
    torque?: number;
    fuelType?: string;
    transmission?: string;
    ecuModel?: string;
  }