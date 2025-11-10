// src/features/car-filter/hooks/useCarFilter.ts
import { useState, useCallback } from 'react';
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
    handleRemoveIconMouseEnter,
    handleRemoveIconMouseLeave
  };
};