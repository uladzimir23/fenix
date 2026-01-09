// src/shared/lib/data/car-data/types.ts
export interface CarBrand {
  id: number;
  name: string;
  logo: string;
  models?: CarModel[]; // Добавляем опциональное поле models
}

export interface CarModel {
  id: number;
  name: string;
  generations?: Generation[]; // Добавляем опциональное поле generations
}

export interface Generation {
  years: string;
  body: string;
  engines: string[];
}

export interface CarDatabase {
  brand: string;
  models: CarModel[];
}