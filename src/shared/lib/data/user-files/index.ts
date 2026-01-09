// src/shared/lib/data/user-files/index.ts
import { UserFile } from '@/shared/api/types/user-file';
import { bmwDatabase } from '../car-data';
import { getUserFileCategories, TuningCategory } from '../tuning-options';

// Генерация моковых данных файлов пользователя
const generateUserFiles = (): UserFile[] => {
  const files: UserFile[] = [];
  const categories = getUserFileCategories();
  const statuses: Array<'pending' | 'approved' | 'rejected'> = ['pending', 'approved', 'rejected'];
  const authors = ['Иван Петров', 'Алексей Смирнов', 'Сергей Козлов', 'Дмитрий Волков'];
  
  let id = 1;

  // Используем optional chaining для безопасного доступа к generations
  bmwDatabase.models.forEach(model => {
    // Проверяем существование generations
    if (model.generations) {
      model.generations.forEach(generation => {
        generation.engines.forEach(engine => {
          categories.forEach((category: string, index: number) => {
            const status = statuses[index % statuses.length];
            const baseHorsepower = 150 + Math.floor(Math.random() * 100);
            const horsepowerGain = 20 + Math.floor(Math.random() * 40);
            
            const file: UserFile = {
              id: id++,
              name: `${category} ${engine.split(' ')[0]} ${model.name}`,
              description: `Прошивка ${category} для ${model.name} ${generation.years} с двигателем ${engine}. Улучшает производительность и отзывчивость.`,
              fileName: `${category.toLowerCase()}_${engine.split(' ')[0].toLowerCase()}_v1.0.bin`,
              fileSize: Math.round((Math.random() * 20 + 5) * 100) / 100,
              uploadDate: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000),
              status,
              statusUpdateDate: status !== 'pending' ? new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000) : undefined,
              rejectionReason: status === 'rejected' ? 'Несоответствие требованиям качества' : undefined,
              category: category as TuningCategory,
              brand: 'BMW',
              model: model.name,
              engine,
              version: '1.0',
              downloadCount: Math.floor(Math.random() * 100),
              rating: Math.round((Math.random() * 2 + 3) * 10) / 10,
              isPublic: status === 'approved',
              author: authors[Math.floor(Math.random() * authors.length)],
              originalHorsepower: baseHorsepower,
              tunedHorsepower: baseHorsepower + horsepowerGain,
              horsepowerGain,
              originalTorque: Math.round(baseHorsepower * 1.8),
              tunedTorque: Math.round(baseHorsepower * 1.8) + Math.round(horsepowerGain * 1.5),
              torqueGain: Math.round(horsepowerGain * 1.5),
              fuelType: Math.random() > 0.5 ? 'Бензин' : 'Дизель',
              fuelConsumptionChange: Math.random() > 0.5 ? `-${Math.floor(Math.random() * 10) + 5}%` : `+${Math.floor(Math.random() * 5)}%`,
              requiredHardware: ['Стандартное оборудование'],
              compatibilityNotes: `Только для ${generation.years} ${generation.body}`,
              changelog: 'v1.0 - Первоначальный релиз',
              supportedECUs: [`ECU${Math.floor(Math.random() * 9000) + 1000}`],
              supportedYears: generation.years,
              transmissionType: Math.random() > 0.5 ? 'Автоматическая' : 'Механическая',
              isEncrypted: Math.random() > 0.7,
              requiresUnlockCode: Math.random() > 0.5,
              recommendedTuningTools: ['KESSv2', 'MPPS v16'],
              knownIssues: Math.random() > 0.8 ? 'Возможны незначительные колебания на холостом ходу' : undefined,
              installationInstructions: 'Прошивка через OBDII разъем',
              testedVehicles: [`BMW ${model.name} ${generation.years}`]
            };

            files.push(file);
          });
        });
      });
    }
  });

  return files;
};

export const mockUserFiles: UserFile[] = generateUserFiles();

// Утилиты для работы с файлами пользователя
export const getUserFilesByStatus = (status: string): UserFile[] => {
  if (status === 'all') return mockUserFiles;
  return mockUserFiles.filter(file => file.status === status);
};

export const getUserFileById = (id: number): UserFile | undefined => {
  return mockUserFiles.find(file => file.id === id);
};

export const getUniqueBrands = (): string[] => {
  const brands = mockUserFiles.map(file => file.brand);
  return ['all', ...Array.from(new Set(brands))];
};

export const getUniqueCategories = (): string[] => {
  const categories = mockUserFiles.map(file => file.category);
  return ['all', ...Array.from(new Set(categories))];
};