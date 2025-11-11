// src/features/car-filter/components/CarFilter.tsx
import React, { useState, useRef } from 'react';
import { TuningOption, FirmwareFile } from '@/shared/api';
import { FirmwareDetail } from '@/features/firmware-detail';
import { mockFirmwareFiles } from '@/shared/lib/data';
import { useCarFilter } from '../hooks/useCarFilter';
import { useCarFilterData } from '../hooks/useCarFilterData';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { FilterPanel } from './FilterPanel/FilterPanel';
import { ResultsPanel } from './ResultsPanel/ResultsPanel';
import { BrandGrid } from './ContentGrid/BrandGrid/BrandGrid';
import { ModelGrid } from './ContentGrid/ModelGrid/ModelGrid';
import { GenerationGrid } from './ContentGrid/GenerationGrid/GenerationGrid';
import { EngineGrid } from './ContentGrid/EngineGrid/EngineGrid';
import { TuningOptionsGrid } from './ContentGrid/TuningOptionsGrid/TuningOptionsGrid';
import { FirmwareGrid } from './ContentGrid/FirmwareGrid/FirmwareGrid';
import { TuningOptionWithCount } from '../types/car-filter.types';
import styles from './CarFilter.module.scss';

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
  const resultsContentRef = useRef<HTMLDivElement>(null);
  const { hasScroll, isScrolling } = useScrollAnimation(resultsContentRef);

  const handleSearchChange = (value: string) => {
    updateSearchTerm(state.viewMode, value);
  };

  const selectionHandlers = {
    brands: (brand: any) => { setSelectedBrand(brand); setViewMode('models'); },
    models: (model: any) => { setSelectedModel(model); setViewMode('generations'); },
    generations: (generation: any) => { setSelectedGeneration(generation); setViewMode('engines'); },
    engines: (engine: string) => { setSelectedEngine(engine); setViewMode('tuning'); },
    tuning: (option: TuningOption) => { setSelectedTuningOption(option); setViewMode('firmware'); },
    firmware: (firmware: FirmwareFile) => setDetailFirmware(firmware)
  };

  const handleBuyFirmware = (firmware: FirmwareFile) => {
    console.log('Покупка прошивки:', firmware);
    alert(`Прошивка "${firmware.name}" добавлена в корзину!`);
  };

  const placeholderTexts = {
    brands: 'Поиск по марке...',
    models: 'Поиск по модели...',
    generations: 'Поиск по поколению...',
    engines: 'Поиск по двигателю...',
    tuning: 'Поиск по опциям...',
    firmware: 'Поиск по прошивкам...'
  };

  const removeHandlers = {
    brand: () => { setSelectedBrand(null); setViewMode('brands'); },
    model: () => { setSelectedModel(null); setViewMode('models'); },
    generation: () => { setSelectedGeneration(null); setViewMode('generations'); },
    engine: () => { setSelectedEngine(null); setViewMode('engines'); },
    tuningOption: () => { setSelectedTuningOption(null); setViewMode('tuning'); },
    firmware: () => { setSelectedFirmware(null); setViewMode('firmware'); }
  };

  const renderRightContent = () => {
    const commonProps = {
      selectedBrand: state.selectedBrand,
      selectedModel: state.selectedModel,
      selectedGeneration: state.selectedGeneration,
      selectedEngine: state.selectedEngine
    };

    const gridComponents = {
      brands: (
        <BrandGrid
          brands={filteredBrands}
          onBrandSelect={selectionHandlers.brands}
          getFirmwareCountByBrand={getFirmwareCountByBrand}
        />
      ),
      models: (
        <ModelGrid
          models={getModels()}
          onModelSelect={selectionHandlers.models}
          getFirmwareCountByModel={getFirmwareCountByModel}
          {...commonProps}
        />
      ),
      generations: (
        <GenerationGrid
          generations={getGenerations()}
          onGenerationSelect={selectionHandlers.generations}
          getFirmwareCountByGeneration={getFirmwareCountByGeneration}
          {...commonProps}
        />
      ),
      engines: (
        <EngineGrid
          engines={getEngines()}
          onEngineSelect={selectionHandlers.engines}
          getFirmwareCountByEngine={getFirmwareCountByEngine}
        />
      ),
      tuning: !state.selectedEngine ? <div>Двигатель не выбран</div> : (() => {
        const allCategories = getCategories();
        const [availableOptions, unavailableOptions] = allCategories.reduce<[TuningOptionWithCount[], TuningOptionWithCount[]]>(
          ([avail, unavail], category, index) => {
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
            
            const optionWithCount = { ...option, count };
            count > 0 ? avail.push(optionWithCount) : unavail.push(optionWithCount);
            return [avail, unavail];
          },
          [[], []]
        );

        return (
          <TuningOptionsGrid
            availableOptions={availableOptions}
            unavailableOptions={unavailableOptions}
            onTuningOptionSelect={selectionHandlers.tuning}
            mockFirmwareFiles={mockFirmwareFiles}
            selectedEngine={state.selectedEngine}
          />
        );
      })(),
      firmware: (
        <FirmwareGrid
          firmwareFiles={getFirmwareFiles()}
          otherFirmwareFiles={getOtherFirmwareFiles()}
          onFirmwareSelect={selectionHandlers.firmware}
          {...commonProps}
        />
      )
    };

    return gridComponents[state.viewMode] || null;
  };

  return (
    <div className={styles.carFilterWrapper}>
      <div className={styles.carFilterContainer}>
        <FilterPanel
          state={state}
          removeIconHover={removeIconHover}
          onViewModeChange={setViewMode}
          onSearchChange={handleSearchChange}
          onRemoveIconMouseEnter={handleRemoveIconMouseEnter}
          onRemoveIconMouseLeave={handleRemoveIconMouseLeave}
          onBrandRemove={removeHandlers.brand}
          onModelRemove={removeHandlers.model}
          onGenerationRemove={removeHandlers.generation}
          onEngineRemove={removeHandlers.engine}
          onTuningOptionRemove={removeHandlers.tuningOption}
          onFirmwareRemove={removeHandlers.firmware}
          onBack={goBack}
          onClearAll={clearAllFilters}
          getPlaceholderText={() => placeholderTexts[state.viewMode] || 'Поиск...'}
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
          onClose={() => setDetailFirmware(null)}
          onBuy={handleBuyFirmware}
        />
      )}
    </div>
  );
};