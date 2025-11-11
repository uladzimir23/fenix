// src/features/car-filter/components/FilterPanel/SelectedItems.tsx
import React from 'react';
import { FaTimes } from 'react-icons/fa';
import Icon from '@/shared/ui/Icon/Icon.tsx';
import { CarFilterState, RemoveIconHoverState } from '../../types/car-filter.types';

interface SelectedItemsProps {
  state: CarFilterState;
  removeIconHover: RemoveIconHoverState;
  onBrandRemove: () => void;
  onModelRemove: () => void;
  onGenerationRemove: () => void;
  onEngineRemove: () => void;
  onTuningOptionRemove: () => void;
  onFirmwareRemove: () => void;
  onRemoveIconMouseEnter: (type: keyof RemoveIconHoverState) => void;
  onRemoveIconMouseLeave: (type: keyof RemoveIconHoverState) => void;
}

export const SelectedItems: React.FC<SelectedItemsProps> = ({
  state,
  removeIconHover,
  onBrandRemove,
  onModelRemove,
  onGenerationRemove,
  onEngineRemove,
  onTuningOptionRemove,
  onFirmwareRemove,
  onRemoveIconMouseEnter,
  onRemoveIconMouseLeave
}) => {
  const {
    selectedBrand,
    selectedModel,
    selectedGeneration,
    selectedEngine,
    selectedTuningOption,
    selectedFirmware
  } = state;

  return (
    <>
      {selectedBrand && (
        <div className="selection-info">
          <div className={`selected-item ${removeIconHover.brand ? 'remove-icon-hover' : ''}`}>
            <span>{selectedBrand.name}</span>
            <Icon
              icon={FaTimes}
              size = 'xl'
              className="remove-icon"
              onClick={onBrandRemove}
              onMouseEnter={() => onRemoveIconMouseEnter('brand')}
              onMouseLeave={() => onRemoveIconMouseLeave('brand')}
            />
          </div>
        </div>
      )}

      {selectedModel && (
        <div className="selection-info">
          <div className={`selected-item ${removeIconHover.model ? 'remove-icon-hover' : ''}`}>
            <span>{selectedModel.name}</span>
            <Icon
              icon={FaTimes}
              size = 'xl'
              className="remove-icon"
              onClick={onModelRemove}
              onMouseEnter={() => onRemoveIconMouseEnter('model')}
              onMouseLeave={() => onRemoveIconMouseLeave('model')}
            />
          </div>
        </div>
      )}

      {selectedGeneration && (
        <div className="selection-info">
          <div className={`selected-item ${removeIconHover.generation ? 'remove-icon-hover' : ''}`}>
            <span>{selectedGeneration.body} ({selectedGeneration.years})</span>
            <Icon
              icon={FaTimes}
              size = 'xl'
              className="remove-icon"
              onClick={onGenerationRemove}
              onMouseEnter={() => onRemoveIconMouseEnter('generation')}
              onMouseLeave={() => onRemoveIconMouseLeave('generation')}
            />
          </div>
        </div>
      )}

      {selectedEngine && (
        <div className="selection-info">
          <div className={`selected-item ${removeIconHover.engine ? 'remove-icon-hover' : ''}`}>
            <span>{selectedEngine}</span>
            <Icon
              icon={FaTimes}
              size = 'xl'
              className="remove-icon"
              onClick={onEngineRemove}
              onMouseEnter={() => onRemoveIconMouseEnter('engine')}
              onMouseLeave={() => onRemoveIconMouseLeave('engine')}
            />
          </div>
        </div>
      )}

      {selectedTuningOption && (
        <div className="selection-info">
          <div className={`selected-item ${removeIconHover.tuningOption ? 'remove-icon-hover' : ''}`}>
            <span>{selectedTuningOption.name}</span>
            <Icon
              icon={FaTimes}
              size = 'xl'
              className="remove-icon"
              onClick={onTuningOptionRemove}
              onMouseEnter={() => onRemoveIconMouseEnter('tuningOption')}
              onMouseLeave={() => onRemoveIconMouseLeave('tuningOption')}
            />
          </div>
        </div>
      )}

      {selectedFirmware && (
        <div className="selection-info">
          <div className={`selected-item ${removeIconHover.firmware ? 'remove-icon-hover' : ''}`}>
            <span>{selectedFirmware.name}</span>
            <Icon
              icon={FaTimes}
              size = 'xl'
              className="remove-icon"
              onClick={onFirmwareRemove}
              onMouseEnter={() => onRemoveIconMouseEnter('firmware')}
              onMouseLeave={() => onRemoveIconMouseLeave('firmware')}
            />
          </div>
        </div>
      )}
    </>
  );
};