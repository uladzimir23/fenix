// src/features/car-filter/hooks/useCarFilterData.ts
import { useCallback } from 'react';
import { TuningOption, FirmwareFile } from '@/shared/api';
import { 
  carBrands, 
  bmwDatabase,
  mockFirmwareFiles,
  getFirmwareCountByBrand,
  getFirmwareCountByModel,
  getFirmwareCountByGeneration,
  getFirmwareCountByEngine,
  CarBrand,
  CarModel,
  Generation
} from '@/shared/lib/data';
import { 
  getCategories,
  getTuningOptionsByEngine,
  getCategoryDescription
} from '@/shared/lib/data';
import { CarFilterState } from '../types/car-filter.types';

export const useCarFilterData = (state: CarFilterState) => {
  const {
    searchTerms,
    selectedBrand,
    selectedModel,
    selectedGeneration,
    selectedEngine,
    selectedTuningOption,
    viewMode
  } = state;

  const filteredBrands = carBrands.filter(brand =>
    brand.name.toLowerCase().includes(searchTerms.brands.toLowerCase())
  );

  const getModels = useCallback((): CarModel[] => {
    if (selectedBrand?.name === 'BMW') {
      return bmwDatabase.models.filter(model =>
        model.name.toLowerCase().includes(searchTerms.models.toLowerCase())
      );
    }
    return [];
  }, [selectedBrand, searchTerms.models]);

  const getGenerations = useCallback((): Generation[] => {
    if (selectedModel && selectedBrand?.name === 'BMW') {
      return selectedModel.generations.filter((generation: Generation) =>
        generation.body.toLowerCase().includes(searchTerms.generations.toLowerCase()) ||
        generation.years.toLowerCase().includes(searchTerms.generations.toLowerCase())
      );
    }
    return [];
  }, [selectedModel, selectedBrand, searchTerms.generations]);

  const getEngines = useCallback((): string[] => {
    if (selectedGeneration) {
      return selectedGeneration.engines.filter((engine: string) =>
        engine.toLowerCase().includes(searchTerms.engines.toLowerCase())
      );
    }
    return [];
  }, [selectedGeneration, searchTerms.engines]);

  const getTuningOptions = useCallback((): TuningOption[] => {
    if (selectedEngine) {
      return getTuningOptionsByEngine(selectedEngine).filter((option: TuningOption) =>
        option.name.toLowerCase().includes(searchTerms.tuning.toLowerCase()) ||
        option.category.toLowerCase().includes(searchTerms.tuning.toLowerCase()) ||
        (option.description && option.description.toLowerCase().includes(searchTerms.tuning.toLowerCase()))
      );
    }
    return [];
  }, [selectedEngine, searchTerms.tuning]);

  const getFirmwareFiles = useCallback((): FirmwareFile[] => {
    if (selectedEngine) {
      return mockFirmwareFiles.filter((firmware: FirmwareFile) => {
        const engineMatch = firmware.engine === selectedEngine;
        const categoryMatch = selectedTuningOption 
          ? firmware.category === selectedTuningOption.category
          : true;
        const searchMatch = 
          firmware.brand.toLowerCase().includes(searchTerms.firmware.toLowerCase()) ||
          firmware.model.toLowerCase().includes(searchTerms.firmware.toLowerCase()) ||
          firmware.engine.toLowerCase().includes(searchTerms.firmware.toLowerCase()) ||
          firmware.name.toLowerCase().includes(searchTerms.firmware.toLowerCase());
        
        return engineMatch && categoryMatch && searchMatch;
      });
    }
    return [];
  }, [selectedEngine, selectedTuningOption, searchTerms.firmware]);

  const getOtherFirmwareFiles = useCallback((): FirmwareFile[] => {
    if (selectedTuningOption && selectedEngine) {
      return mockFirmwareFiles.filter((firmware: FirmwareFile) => {
        const engineMatch = firmware.engine === selectedEngine;
        const categoryDiff = firmware.category !== selectedTuningOption.category;
        return engineMatch && categoryDiff;
      });
    }
    return [];
  }, [selectedTuningOption, selectedEngine]);

  return {
    filteredBrands,
    getModels,
    getGenerations,
    getEngines,
    getTuningOptions,
    getFirmwareFiles,
    getOtherFirmwareFiles,
    getFirmwareCountByBrand,
    getFirmwareCountByModel,
    getFirmwareCountByGeneration,
    getFirmwareCountByEngine,
    getCategories,
    getCategoryDescription
  };
};