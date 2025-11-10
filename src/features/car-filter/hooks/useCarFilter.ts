// src/features/car-filter/hooks/useCarFilter.ts
import { useState, useCallback } from 'react';
import { CarBrand, CarModel, Generation } from '@/shared/lib/data';
import { TuningOption, FirmwareFile } from '@/shared/api';
import { CarFilterState, ViewMode, SearchTerms, RemoveIconHoverState } from '../types/car-filter.types';

export const useCarFilter = () => {
  const [state, setState] = useState<CarFilterState>({
    searchTerms: {
      brands: '',
      models: '',
      generations: '',
      engines: '',
      tuning: '',
      firmware: ''
    },
    selectedBrand: null,
    selectedModel: null,
    selectedGeneration: null,
    selectedEngine: null,
    selectedTuningOption: null,
    selectedFirmware: null,
    viewMode: 'brands'
  });

  const [removeIconHover, setRemoveIconHover] = useState<RemoveIconHoverState>({
    brand: false,
    model: false,
    generation: false,
    engine: false,
    tuningOption: false,
    firmware: false
  });

  const updateSearchTerm = useCallback((mode: ViewMode, value: string) => {
    setState(prev => ({
      ...prev,
      searchTerms: {
        ...prev.searchTerms,
        [mode]: value
      }
    }));
  }, []);

  const setViewMode = useCallback((mode: ViewMode) => {
    setState(prev => ({ ...prev, viewMode: mode }));
  }, []);

  const setSelectedBrand = useCallback((brand: CarBrand | null) => {
    setState(prev => ({ 
      ...prev, 
      selectedBrand: brand,
      selectedModel: null,
      selectedGeneration: null,
      selectedEngine: null,
      selectedTuningOption: null,
      selectedFirmware: null
    }));
  }, []);

  const setSelectedModel = useCallback((model: CarModel | null) => {
    setState(prev => ({ 
      ...prev, 
      selectedModel: model,
      selectedGeneration: null,
      selectedEngine: null,
      selectedTuningOption: null,
      selectedFirmware: null
    }));
  }, []);

  const setSelectedGeneration = useCallback((generation: Generation | null) => {
    setState(prev => ({ 
      ...prev, 
      selectedGeneration: generation,
      selectedEngine: null,
      selectedTuningOption: null,
      selectedFirmware: null
    }));
  }, []);

  const setSelectedEngine = useCallback((engine: string | null) => {
    setState(prev => ({ 
      ...prev, 
      selectedEngine: engine,
      selectedTuningOption: null,
      selectedFirmware: null
    }));
  }, []);

  const setSelectedTuningOption = useCallback((option: TuningOption | null) => {
    setState(prev => ({ 
      ...prev, 
      selectedTuningOption: option,
      selectedFirmware: null
    }));
  }, []);

  const setSelectedFirmware = useCallback((firmware: FirmwareFile | null) => {
    setState(prev => ({ ...prev, selectedFirmware: firmware }));
  }, []);

  const clearAllFilters = useCallback(() => {
    setState({
      searchTerms: {
        brands: '',
        models: '',
        generations: '',
        engines: '',
        tuning: '',
        firmware: ''
      },
      selectedBrand: null,
      selectedModel: null,
      selectedGeneration: null,
      selectedEngine: null,
      selectedTuningOption: null,
      selectedFirmware: null,
      viewMode: 'brands'
    });
  }, []);

  const goBack = useCallback(() => {
    setState(prev => {
      switch (prev.viewMode) {
        case 'firmware':
          return { ...prev, viewMode: 'tuning', selectedFirmware: null };
        case 'tuning':
          return { ...prev, viewMode: 'engines', selectedTuningOption: null };
        case 'engines':
          return { ...prev, viewMode: 'generations', selectedEngine: null };
        case 'generations':
          return { ...prev, viewMode: 'models', selectedGeneration: null };
        case 'models':
          return { 
            ...prev, 
            viewMode: 'brands', 
            selectedModel: null,
            selectedBrand: null
          };
        default:
          return { ...prev, viewMode: 'brands' };
      }
    });
  }, []);

  const handleRemoveIconMouseEnter = useCallback((type: keyof RemoveIconHoverState) => {
    setRemoveIconHover(prev => ({ ...prev, [type]: true }));
  }, []);

  const handleRemoveIconMouseLeave = useCallback((type: keyof RemoveIconHoverState) => {
    setRemoveIconHover(prev => ({ ...prev, [type]: false }));
  }, []);

  return {
    state,
    setState,
    removeIconHover,
    updateSearchTerm,
    setViewMode,
    setSelectedBrand,
    setSelectedModel,
    setSelectedGeneration,
    setSelectedEngine,
    setSelectedTuningOption,
    setSelectedFirmware,
    clearAllFilters,
    goBack,
    handleRemoveIconMouseEnter,
    handleRemoveIconMouseLeave
  };
};