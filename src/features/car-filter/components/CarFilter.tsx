// src/features/car-filter/components/CarFilter.tsx
import React, { useState, useEffect, useRef } from 'react';
import { TuningOption, FirmwareFile } from '@/shared/api';
import { FirmwareDetail } from '@/features/firmware-detail';
import { mockFirmwareFiles } from '@/shared/lib/data';
import { useCarFilter } from '../hooks/useCarFilter';
import { useCarFilterData } from '../hooks/useCarFilterData';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { FilterPanel } from './FilterPanel/FilterPanel';
import { ResultsPanel } from './ResultsPanel/ResultsPanel';
import { BrandGrid } from './ContentGrid/BrandGrid';
import { ModelGrid } from './ContentGrid/ModelGrid';
import { GenerationGrid } from './ContentGrid/GenerationGrid';
import { EngineGrid } from './ContentGrid/EngineGrid';
import { TuningOptionsGrid } from './ContentGrid/TuningOptionsGrid';
import { FirmwareGrid } from './ContentGrid/FirmwareGrid';
import { TuningOptionWithCount } from '../types/car-filter.types';
import '../styles/CarFilter.scss';

export const CarFilter: React.FC = () => {
  const {
    state,
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
  } = useCarFilter();

  const {
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
  } = useCarFilterData(state);

  const [detailFirmware, setDetailFirmware] = useState<FirmwareFile | null>(null);
  const [isGridVisible, setIsGridVisible] = useState(true);
  
  const resultsContentRef = useRef<HTMLDivElement>(null);
  const { hasScroll, isScrolling } = useScrollAnimation(resultsContentRef);


  // Анимация появления сетки
  useEffect(() => {
    setIsGridVisible(false);
    const timer = setTimeout(() => {
      setIsGridVisible(true);
    }, 50);
    return () => clearTimeout(timer);
  }, [state.viewMode]);

  // Исправленный обработчик поиска
  const handleSearchChange = (value: string) => {
    updateSearchTerm(state.viewMode, value);
  };

  const handleBrandSelect = (brand: any) => {
    setSelectedBrand(brand);
    setViewMode('models');
  };

  const handleModelSelect = (model: any) => {
    setSelectedModel(model);
    setViewMode('generations');
  };

  const handleGenerationSelect = (generation: any) => {
    setSelectedGeneration(generation);
    setViewMode('engines');
  };

  const handleEngineSelect = (engine: string) => {
    setSelectedEngine(engine);
    setViewMode('tuning');
  };

  const handleTuningOptionSelect = (option: TuningOption) => {
    setSelectedTuningOption(option);
    setViewMode('firmware');
  };

  const handleFirmwareSelect = (firmware: FirmwareFile) => {
    setDetailFirmware(firmware);
  };

  const handleBuyFirmware = (firmware: FirmwareFile) => {
    console.log('Покупка прошивки:', firmware);
    alert(`Прошивка "${firmware.name}" добавлена в корзину!`);
  };

  const handleCloseDetail = () => {
    setDetailFirmware(null);
  };

  const getPlaceholderText = () => {
    switch (state.viewMode) {
      case 'brands': return 'Поиск по марке...';
      case 'models': return 'Поиск по модели...';
      case 'generations': return 'Поиск по поколению...';
      case 'engines': return 'Поиск по двигателю...';
      case 'tuning': return 'Поиск по опциям...';
      case 'firmware': return 'Поиск по прошивкам...';
      default: return 'Поиск...';
    }
  };

  const renderRightContent = () => {
    if (!isGridVisible) return null;
    
    switch (state.viewMode) {
      case 'brands':
        return (
          <BrandGrid
            brands={filteredBrands}
            onBrandSelect={handleBrandSelect}
            getFirmwareCountByBrand={getFirmwareCountByBrand}
          />
        );
      case 'models':
        return (
          <ModelGrid
            models={getModels()}
            onModelSelect={handleModelSelect}
            getFirmwareCountByModel={getFirmwareCountByModel}
            selectedBrand={state.selectedBrand}
          />
        );
      case 'generations':
        return (
          <GenerationGrid
            generations={getGenerations()}
            onGenerationSelect={handleGenerationSelect}
            getFirmwareCountByGeneration={getFirmwareCountByGeneration}
            selectedBrand={state.selectedBrand}
            selectedModel={state.selectedModel}
          />
        );
      case 'engines':
        return (
          <EngineGrid
            engines={getEngines()}
            onEngineSelect={handleEngineSelect}
            getFirmwareCountByEngine={getFirmwareCountByEngine}
          />
        );
      case 'tuning':
        if (!state.selectedEngine) {
          return <div>Двигатель не выбран</div>;
        }
        
        const allCategories = getCategories();
        const availableOptions: TuningOptionWithCount[] = [];
        const unavailableOptions: TuningOptionWithCount[] = [];
        
        allCategories.forEach((category, index) => {
          const existingOption = getTuningOptions().find(option => 
            option.category === category && option.engineCode === state.selectedEngine
          );
          
          const option = existingOption || {
            id: index + 10000,
            name: `${category} ${state.selectedEngine!.split(' ')[0]}`,
            description: getCategoryDescription(category),
            category,
            engineCode: state.selectedEngine!
          };
          
          const count = mockFirmwareFiles.filter(firmware => 
            firmware.engine === state.selectedEngine && 
            firmware.category === option.category
          ).length;
          
          if (count > 0) {
            availableOptions.push({...option, count});
          } else {
            unavailableOptions.push({...option, count});
          }
        });

        return (
          <TuningOptionsGrid
            availableOptions={availableOptions}
            unavailableOptions={unavailableOptions}
            onTuningOptionSelect={handleTuningOptionSelect}
            mockFirmwareFiles={mockFirmwareFiles}
            selectedEngine={state.selectedEngine}
          />
        );
      case 'firmware':
        return (
          <FirmwareGrid
            firmwareFiles={getFirmwareFiles()}
            otherFirmwareFiles={getOtherFirmwareFiles()}
            onFirmwareSelect={handleFirmwareSelect}
            selectedBrand={state.selectedBrand}
            selectedModel={state.selectedModel}
            selectedGeneration={state.selectedGeneration}
            selectedEngine={state.selectedEngine}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="car-filter-wrapper">
      <div className="car-filter-container">
        <FilterPanel
          state={state}
          removeIconHover={removeIconHover}
          onViewModeChange={setViewMode}
          onSearchChange={handleSearchChange}
          onRemoveIconMouseEnter={handleRemoveIconMouseEnter}
          onRemoveIconMouseLeave={handleRemoveIconMouseLeave}
          onBrandRemove={() => {
            setSelectedBrand(null);
            setViewMode('brands');
          }}
          onModelRemove={() => {
            setSelectedModel(null);
            setViewMode('models');
          }}
          onGenerationRemove={() => {
            setSelectedGeneration(null);
            setViewMode('generations');
          }}
          onEngineRemove={() => {
            setSelectedEngine(null);
            setViewMode('engines');
          }}
          onTuningOptionRemove={() => {
            setSelectedTuningOption(null);
            setViewMode('tuning');
          }}
          onFirmwareRemove={() => {
            setSelectedFirmware(null);
            setViewMode('firmware');
          }}
          onBack={goBack}
          onClearAll={clearAllFilters}
          getPlaceholderText={getPlaceholderText}
        />

        <ResultsPanel
          state={state}
          hasScroll={hasScroll}
          isScrolling={isScrolling}
          resultsContentRef={resultsContentRef}
          onClearAll={clearAllFilters}
          renderRightContent={renderRightContent}
        />
      </div>

      {detailFirmware && (
        <FirmwareDetail
          firmware={detailFirmware}
          onClose={handleCloseDetail}
          onBuy={handleBuyFirmware}
        />
      )}
    </div>
  );
};