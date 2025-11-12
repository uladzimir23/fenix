// src/shared/lib/data/index.ts
export * from './car-data';
export * from './firmware';
// Явно ре-экспортируем из tuning-options, чтобы избежать конфликтов
export { 
  tuningOptionsData, 
  getTuningOptionsByEngine, 
  getTuningOptionsByCategory,
  getTuningCategories,
  getTuningCategoryDescription,
  getUserFileCategories
} from './tuning-options';
export type { TuningCategory } from './tuning-options'; // Используем export type для типов
export * from './user-files';