import React from 'react';
import { FaTimes } from 'react-icons/fa';
import Icon from '@/shared/ui/Icon/Icon.tsx';
import { CarFilterState, RemoveIconHoverState } from '../../../types/car-filter.types';
import styles from './SelectedItems.module.scss';

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
        <div className={styles.selectionInfo}>
          <div className={`${styles.selectedItem} ${removeIconHover.brand ? styles.removeIconHover : ''}`}>
            <span>{selectedBrand.name}</span>
            <Icon
              icon={FaTimes}
              size='xl'
              className={styles.removeIcon}
              onClick={onBrandRemove}
              onMouseEnter={() => onRemoveIconMouseEnter('brand')}
              onMouseLeave={() => onRemoveIconMouseLeave('brand')}
            />
          </div>
        </div>
      )}

      {selectedModel && (
        <div className={styles.selectionInfo}>
          <div className={`${styles.selectedItem} ${removeIconHover.model ? styles.removeIconHover : ''}`}>
            <span>{selectedModel.name}</span>
            <Icon
              icon={FaTimes}
              size='xl'
              className={styles.removeIcon}
              onClick={onModelRemove}
              onMouseEnter={() => onRemoveIconMouseEnter('model')}
              onMouseLeave={() => onRemoveIconMouseLeave('model')}
            />
          </div>
        </div>
      )}

      {selectedGeneration && (
        <div className={styles.selectionInfo}>
          <div className={`${styles.selectedItem} ${removeIconHover.generation ? styles.removeIconHover : ''}`}>
            <span>{selectedGeneration.body} ({selectedGeneration.years})</span>
            <Icon
              icon={FaTimes}
              size='xl'
              className={styles.removeIcon}
              onClick={onGenerationRemove}
              onMouseEnter={() => onRemoveIconMouseEnter('generation')}
              onMouseLeave={() => onRemoveIconMouseLeave('generation')}
            />
          </div>
        </div>
      )}

      {selectedEngine && (
        <div className={styles.selectionInfo}>
          <div className={`${styles.selectedItem} ${removeIconHover.engine ? styles.removeIconHover : ''}`}>
            <span>{selectedEngine}</span>
            <Icon
              icon={FaTimes}
              size='xl'
              className={styles.removeIcon}
              onClick={onEngineRemove}
              onMouseEnter={() => onRemoveIconMouseEnter('engine')}
              onMouseLeave={() => onRemoveIconMouseLeave('engine')}
            />
          </div>
        </div>
      )}

      {selectedTuningOption && (
        <div className={styles.selectionInfo}>
          <div className={`${styles.selectedItem} ${removeIconHover.tuningOption ? styles.removeIconHover : ''}`}>
            <span>{selectedTuningOption.name}</span>
            <Icon
              icon={FaTimes}
              size='xl'
              className={styles.removeIcon}
              onClick={onTuningOptionRemove}
              onMouseEnter={() => onRemoveIconMouseEnter('tuningOption')}
              onMouseLeave={() => onRemoveIconMouseLeave('tuningOption')}
            />
          </div>
        </div>
      )}

      {selectedFirmware && (
        <div className={styles.selectionInfo}>
          <div className={`${styles.selectedItem} ${removeIconHover.firmware ? styles.removeIconHover : ''}`}>
            <span>{selectedFirmware.name}</span>
            <Icon
              icon={FaTimes}
              size='xl'
              className={styles.removeIcon}
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