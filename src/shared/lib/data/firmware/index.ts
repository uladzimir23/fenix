// src/shared/lib/data/firmware/index.ts
import { FirmwareFile } from '@/shared/api';
import { bmwDatabase } from '../car-data';
import { CategoryKey, CategoryDescription, FirmwareFilters, FirmwareStats } from './types';

// Детерминированный генератор случайных чисел (упрощенная версия)
class DeterministicRandom {
  private seed: number;

  constructor(seed: string) {
    this.seed = this.hashString(seed);
  }

  private hashString(str: string): number {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
    return Math.abs(hash);
  }

  public random(): number {
    const x = Math.sin(this.seed++) * 10000;
    return x - Math.floor(x);
  }

  public randomInRange(min: number, max: number): number {
    return Math.floor(this.random() * (max - min + 1)) + min;
  }

  public randomElement<T>(array: T[]): T {
    return array[this.randomInRange(0, array.length - 1)];
  }

  public randomSample<T>(array: T[], count: number): T[] {
    const shuffled = [...array].sort(() => this.random() - 0.5);
    return shuffled.slice(0, count);
  }
}

// Генератор цен на основе категории
const generatePrice = (category: string, random: DeterministicRandom): number => {
  const basePrices: Record<string, number> = {
    'Stage1': 15000,
    'Stage2': 25000,
    'Stage3': 40000,
    'E85': 18000,
    'DPFoff': 12000,
    'EGRoff': 10000,
    'IMMOoff': 8000,
    'ADBLUEoff': 15000,
    'SAPoff': 9000,
    'EVAPoff': 7000,
    'Custom': 30000,
    'Eco': 10000,
    'Valet': 5000,
    'Race': 35000,
    'ST1': 8000,
    'Std': 5000,
    'E2': 6000
  };

  const basePrice = basePrices[category] || 10000;
  const variation = random.randomInRange(-2000, 2000);
  return basePrice + variation;
};

// Описания категорий прошивок
export const categoryDescriptions: CategoryDescription = {
  Stage1: "Stage1 - При использовании прошивок Stage1, никаких механических доработок двигателя, впуска или выпуска не требуется.",
  Stage2: "Stage2 - прошивка для двигателя с доработанным железом: интеркулер, выхлопная система, воздушный фильтр.",
  Stage3: "Stage3 - максимальный тюнинг с серьезными доработками двигателя, турбины и других компонентов.",
  E85: "E85 - прошивка для работы на биоэтаноле (смесь 85% этанола и 15% бензина).",
  DPFoff: "DPFoff - прошивка с отключенной системой сажевого фильтра.",
  EGRoff: "EGRoff - прошивка с отключенной системой ЕГР.",
  IMMOoff: "IMMOoff - прошивка с отключенным опросом иммобилайзера.",
  ADBLUEoff: "ADBLUEoff - прошивка с отключенной системой подачи мочевины.",
  SAPoff: "SAPoff - прошивка с отключенной системой вторичного воздуха.",
  EVAPoff: "EVAPoff - прошивка с отключенной системой адсорбера.",
  Custom: "Custom - кастомная прошивка под индивидуальные требования.",
  Eco: "Eco - эко-прошивка для снижения расхода топлива.",
  Valet: "Valet - валет-режим с ограничением мощности.",
  Race: "Race - гоночная прошивка для трека.",
  ST1: "ST1 - прошивки на бензиновые атмосферные двигателя, где программный тюнинг не дает ощутимого прироста мощности, но улучшает отзывчивость и динамику.",
  Std: "Std - стандартная заводская прошивка, без улучшения силовых характеристик двигателя.",
  E2: "E2 - (Евро-2) - прошивка с отключенным контролем катализатора и отключенным задним датчиком кислорода."
};

// Вспомогательные данные
const fuelTypes = ['Бензин', 'Дизель', 'Бензин/E85', 'Гибрид', 'Газ/Бензин'];
const transmissionTypes = ['Механическая', 'Автоматическая', 'CVT', 'DSG/S-Tronic'];
const tuningTools = ['KESSv2', 'MPPS v16', 'K-TAG', 'MPPS', 'ODIS', 'VCDS'];
const authors = ['Иван Петров', 'Алексей Смирнов', 'Сергей Козлов', 'Дмитрий Волков'];
const statuses: Array<'verified' | 'pending' | 'rejected'> = ['verified', 'pending', 'rejected'];

// Функция для извлечения мощности из строки двигателя
const extractHorsepower = (engine: string): number => {
  const match = engine.match(/(\d+)\s*hp/);
  return match ? parseInt(match[1], 10) : 150;
};

// Функция для определения типа топлива
const determineFuelType = (engine: string): string => {
  if (engine.toLowerCase().includes('diesel')) return 'Дизель';
  if (engine.toLowerCase().includes('petrol') || engine.toLowerCase().includes('gasoline')) return 'Бензин';
  if (engine.toLowerCase().includes('hybrid')) return 'Гибрид';
  return Math.random() > 0.5 ? 'Бензин' : 'Дизель';
};

// Генерация моковых данных прошивок
const generateFirmwareFiles = (): FirmwareFile[] => {
  const firmwareFiles: FirmwareFile[] = [];
  let id = 1;

  bmwDatabase.models.forEach(model => {
    model.generations.forEach(generation => {
      generation.engines.forEach(engine => {
        const seed = `firmware-${model.name}-${generation.body}-${engine}`;
        const random = new DeterministicRandom(seed);
        
        const categories = Object.keys(categoryDescriptions) as CategoryKey[];
        const selectedCategories = random.randomSample(categories, random.randomInRange(2, 4));

        selectedCategories.forEach((category: CategoryKey) => {
          const baseHorsepower = extractHorsepower(engine);
          const categorySeed = `${seed}-${category}`;
          const categoryRandom = new DeterministicRandom(categorySeed);
          
          const horsepowerGain = category === 'Stage1' ? categoryRandom.randomInRange(30, 60) :
                               category === 'Stage2' ? categoryRandom.randomInRange(60, 100) :
                               category === 'Stage3' ? categoryRandom.randomInRange(100, 150) :
                               category === 'Eco' ? categoryRandom.randomInRange(5, 15) : categoryRandom.randomInRange(10, 40);

          const torqueGain = Math.round(horsepowerGain * 1.5);
          const fuelType = determineFuelType(engine);
          const price = generatePrice(category, categoryRandom);

          const firmware: FirmwareFile = {
            id: id++,
            name: `${bmwDatabase.brand} ${engine.split(' ')[0]} ${category}`,
            description: `${categoryDescriptions[category]}\n\nПрименение: ${bmwDatabase.brand} ${model.name} ${generation.years} ${generation.body}, двигатель: ${engine}`,
            uploadDate: new Date(Date.now() - categoryRandom.randomInRange(0, 365 * 2 * 24 * 60 * 60 * 1000)),
            version: `${categoryRandom.randomInRange(1, 2)}.${categoryRandom.randomInRange(0, 5)}`,
            brand: bmwDatabase.brand,
            model: model.name,
            engine: engine,
            category: category,
            fileSize: Math.round((categoryRandom.randomInRange(15, 35) / 10) * 10) / 10,
            downloadCount: categoryRandom.randomInRange(0, 300),
            rating: Math.round((categoryRandom.randomInRange(35, 50) / 10) * 10) / 10,
            isPublic: categoryRandom.randomInRange(0, 10) > 3,
            horsepowerGain: horsepowerGain,
            torqueGain: torqueGain,
            fuelType: fuelType,
            originalHorsepower: baseHorsepower,
            tunedHorsepower: baseHorsepower + horsepowerGain,
            originalTorque: Math.round(baseHorsepower * 1.8),
            tunedTorque: Math.round(baseHorsepower * 1.8) + torqueGain,
            fuelConsumptionChange: category === 'Eco' ? `-${categoryRandom.randomInRange(5, 15)}%` : 
                                 categoryRandom.randomInRange(0, 10) > 5 ? `+${categoryRandom.randomInRange(0, 10)}%` : `-${categoryRandom.randomInRange(0, 5)}%`,
            requiredHardware: category === 'Stage2' || category === 'Stage3' ? 
                              ['Увеличенный интеркулер', 'Спорт выхлоп'] : [],
            compatibilityNotes: `Только для ${generation.years} ${generation.body} с двигателем ${engine.split(' ')[0]}`,
            changelog: `v1.0 - Первоначальный релиз`,
            author: categoryRandom.randomElement(authors),
            supportedECUs: ['ECU' + categoryRandom.randomInRange(1000, 9999)],
            status: categoryRandom.randomElement(statuses),
            lastUpdated: new Date(Date.now() - categoryRandom.randomInRange(0, 180 * 24 * 60 * 60 * 1000)),
            fileName: `${bmwDatabase.brand.toLowerCase()}_${engine.split(' ')[0].toLowerCase()}_${category.toLowerCase()}_v1.0.bin`,
            isEncrypted: categoryRandom.randomInRange(0, 10) > 7,
            requiresUnlockCode: categoryRandom.randomInRange(0, 10) > 5,
            recommendedTuningTools: [categoryRandom.randomElement(tuningTools)],
            knownIssues: categoryRandom.randomInRange(0, 10) > 8 ? 'Возможны незначительные колебания на холостом ходу' : undefined,
            installationInstructions: categoryRandom.randomInRange(0, 10) > 5 ? 'Прошивка через OBDII разъем' : 'Требуется снятие и вскрытие ЭБУ',
            testedVehicles: [`${bmwDatabase.brand} ${model.name} ${generation.years}`],
            supportedYears: generation.years,
            transmissionType: categoryRandom.randomElement(transmissionTypes),
            price: price
          };

          firmwareFiles.push(firmware);
        });
      });
    });
  });

  return firmwareFiles;
};

export const mockFirmwareFiles: FirmwareFile[] = generateFirmwareFiles();

// Утилиты для работы с прошивками
export const getFirmwareCountByBrand = (brand: string): number => {
  return mockFirmwareFiles.filter(firmware => firmware.brand === brand).length;
};

export const getFirmwareCountByModel = (brand: string, model: string): number => {
  return mockFirmwareFiles.filter(firmware => 
    firmware.brand === brand && firmware.model === model
  ).length;
};

export const getFirmwareCountByGeneration = (brand: string, model: string, generationBody: string): number => {
  return mockFirmwareFiles.filter(firmware => 
    firmware.brand === brand && 
    firmware.model === model &&
    firmware.description?.includes(generationBody)
  ).length;
};

export const getFirmwareCountByEngine = (engine: string): number => {
  return mockFirmwareFiles.filter(firmware => firmware.engine === engine).length;
};

export const getFirmwareCountByCategory = (category: string): number => {
  return mockFirmwareFiles.filter(firmware => firmware.category === category).length;
};

export const getFirmwareByFilters = (filters: FirmwareFilters): FirmwareFile[] => {
  return mockFirmwareFiles.filter(firmware => {
    if (filters.brand && firmware.brand !== filters.brand) return false;
    if (filters.model && firmware.model !== filters.model) return false;
    if (filters.engine && firmware.engine !== filters.engine) return false;
    if (filters.category && firmware.category !== filters.category) return false;
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      return (
        firmware.name.toLowerCase().includes(query) ||
        firmware.description.toLowerCase().includes(query) ||
        firmware.brand.toLowerCase().includes(query) ||
        firmware.model.toLowerCase().includes(query)
      );
    }
    return true;
  });
};

export const getFirmwareStats = (): FirmwareStats => {
  const stats: FirmwareStats = {
    total: mockFirmwareFiles.length,
    byBrand: {},
    byCategory: {},
    byModel: {}
  };

  mockFirmwareFiles.forEach(firmware => {
    stats.byBrand[firmware.brand] = (stats.byBrand[firmware.brand] || 0) + 1;
    stats.byCategory[firmware.category] = (stats.byCategory[firmware.category] || 0) + 1;
    stats.byModel[`${firmware.brand} ${firmware.model}`] = (stats.byModel[`${firmware.brand} ${firmware.model}`] || 0) + 1;
  });

  return stats;
};

export const getCategories = (): CategoryKey[] => {
  return Object.keys(categoryDescriptions) as CategoryKey[];
};

export const getCategoryDescription = (category: string): string => {
  return categoryDescriptions[category] || 'Описание недоступно';
};