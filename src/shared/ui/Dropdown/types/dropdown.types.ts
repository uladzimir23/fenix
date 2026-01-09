// src/shared/ui/Dropdown/types/dropdown.types.ts
import { CarBrand } from '@/shared/lib/data/car-data/types';

export interface DropdownOption {
  value: string;
  label: string;
  logo?: string;
  disabled?: boolean;
}

export interface DropdownBaseProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  dependencies?: {
    enabled: boolean;
    message?: string;
  };
}

export interface SearchableDropdownProps extends DropdownBaseProps {
  options: DropdownOption[];
  searchPlaceholder?: string;
  maxHeight?: number;
  renderOption?: (option: DropdownOption, isSelected: boolean) => React.ReactNode;
}

// Типы для MultiSelect
export interface MultiSelectDropdownProps {
    selectedValues: string[];
    onChange: (values: string[]) => void;
    options: DropdownOption[];
    placeholder?: string;
    className?: string;
    disabled?: boolean;
    maxHeight?: number;
    renderSelectedItem?: (option: DropdownOption) => React.ReactNode; // Убираем onRemove из пропсов
}
  
// Типы для цепочки автомобильных фильтров
export interface CarSelection {
  brand: string;
  model: string;
  generation: string;
  engine: string;
}

export interface CarDependencyChainProps {
  selection: CarSelection;
  onSelectionChange: (selection: CarSelection) => void;
  carBrands: CarBrand[];
  disabled?: boolean;
}