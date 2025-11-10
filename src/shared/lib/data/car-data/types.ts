// src/shared/lib/data/car-data/types.ts
export interface CarBrand {
    id: number;
    name: string;
    logo: string;
  }
  
  export interface Generation {
    years: string;
    body: string;
    engines: string[];
  }
  
  export interface CarModel {
    id: number;
    name: string;
    generations: Generation[];
  }
  
  export interface CarDatabase {
    brand: string;
    models: CarModel[];
  }
  
  export interface CarEngine {
    engines: string[];
  }