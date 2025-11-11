import React from 'react';
import { CarFilterState, RemoveIconHoverState, ViewMode } from '../../types/car-filter.types';
import { Breadcrumbs } from './Breadcrumbs/Breadcrumbs';
import { SearchInput } from './SearchInput/SearchInput';
import { SelectedItems } from './SelectedItems/SelectedItems';
import { FilterButtons } from './FilterButtons/FilterButtons';
import styles from './FilterPanel.module.scss';

interface FilterPanelProps {
  state: CarFilterState;
  removeIconHover: RemoveIconHoverState;
  onViewModeChange: (mode: ViewMode) => void;
  onSearchChange: (value: string) => void;
  onRemoveIconMouseEnter: (type: keyof RemoveIconHoverState) => void;
  onRemoveIconMouseLeave: (type: keyof RemoveIconHoverState) => void;
  onBrandRemove: () => void;
  onModelRemove: () => void;
  onGenerationRemove: () => void;
  onEngineRemove: () => void;
  onTuningOptionRemove: () => void;
  onFirmwareRemove: () => void;
  onBack: () => void;
  onClearAll: () => void;
  getPlaceholderText: () => string;
}

export const FilterPanel: React.FC<FilterPanelProps> = ({
  state,
  removeIconHover,
  onViewModeChange,
  onSearchChange,
  onRemoveIconMouseEnter,
  onRemoveIconMouseLeave,
  onBrandRemove,
  onModelRemove,
  onGenerationRemove,
  onEngineRemove,
  onTuningOptionRemove,
  onFirmwareRemove,
  onBack,
  onClearAll,
  getPlaceholderText
}) => {
  const hasActiveFilters = Boolean(
    state.selectedBrand || 
    state.selectedModel || 
    state.selectedGeneration || 
    state.selectedEngine || 
    state.selectedTuningOption || 
    state.selectedFirmware || 
    Object.values(state.searchTerms).some(term => term !== '')
  );

  return (
    <div className={styles.filterPanel}>
      <div className={styles.headerFilterPanel}>
        <h2>Поиск прошивок</h2>
      </div>
      <div className={styles.resultsFilterPanel}>
        <Breadcrumbs
          viewMode={state.viewMode}
          selectedBrand={state.selectedBrand}
          selectedModel={state.selectedModel}
          selectedGeneration={state.selectedGeneration}
          selectedEngine={state.selectedEngine}
          selectedTuningOption={state.selectedTuningOption}
          onBreadcrumbClick={onViewModeChange}
        />

        <SearchInput
          value={state.searchTerms[state.viewMode]}
          placeholder={getPlaceholderText()}
          onChange={onSearchChange}
        />

        <SelectedItems
          state={state}
          removeIconHover={removeIconHover}
          onBrandRemove={onBrandRemove}
          onModelRemove={onModelRemove}
          onGenerationRemove={onGenerationRemove}
          onEngineRemove={onEngineRemove}
          onTuningOptionRemove={onTuningOptionRemove}
          onFirmwareRemove={onFirmwareRemove}
          onRemoveIconMouseEnter={onRemoveIconMouseEnter}
          onRemoveIconMouseLeave={onRemoveIconMouseLeave}
        />

        <FilterButtons
          viewMode={state.viewMode}
          hasActiveFilters={hasActiveFilters}
          onBack={onBack}
          onClearAll={onClearAll}
        />
      </div>
    </div>
  );
};