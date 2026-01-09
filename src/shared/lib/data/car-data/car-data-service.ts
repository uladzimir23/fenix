// src/shared/lib/data/car-data/car-data-service.ts
import { CarBrand, CarDatabase, CarModel, Generation } from './types';
import { bmwDatabase } from './index';

// Сервис для работы с автомобильными данными
export class CarDataService {
  private static instance: CarDataService;
  private databases: Map<string, CarDatabase> = new Map();

  private constructor() {
    // Инициализируем базы данных
    this.databases.set('BMW', bmwDatabase);
    // Здесь можно добавить другие базы данных по мере необходимости
  }

  public static getInstance(): CarDataService {
    if (!CarDataService.instance) {
      CarDataService.instance = new CarDataService();
    }
    return CarDataService.instance;
  }

  // Получаем модели для бренда
  public getModels(brandName: string): CarModel[] {
    const database = this.databases.get(brandName);
    return database?.models || [];
  }

  // Получаем поколения для модели
  public getGenerations(brandName: string, modelName: string): Generation[] {
    const models = this.getModels(brandName);
    const model = models.find(m => m.name === modelName);
    return model?.generations || [];
  }

  // Получаем двигатели для поколения
  public getEngines(brandName: string, modelName: string, generationBody: string): string[] {
    const generations = this.getGenerations(brandName, modelName);
    const generation = generations.find(g => g.body === generationBody);
    return generation?.engines || [];
  }

  // Проверяем, есть ли данные для бренда
  public hasBrandData(brandName: string): boolean {
    return this.databases.has(brandName);
  }

  // Получаем все бренды с данными
  public getBrandsWithData(): string[] {
    return Array.from(this.databases.keys());
  }
}

export const carDataService = CarDataService.getInstance();