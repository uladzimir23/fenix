// src/features/car-filter/types/car-filter.types.ts
import { TuningOption, FirmwareFile } from '@/shared/api';
import { CarBrand, CarModel, Generation } from '@/shared/lib/data';

export interface CarFilterState {
  searchTerms: SearchTerms;
  selectedBrand: CarBrand | null;
  selectedModel: CarModel | null;
  selectedGeneration: Generation | null;
  selectedEngine: string | null;
  selectedTuningOption: TuningOption | null;
  selectedFirmware: FirmwareFile | null;
  viewMode: ViewMode;
}

export type ViewMode = 'brands' | 'models' | 'generations' | 'engines' | 'tuning' | 'firmware';

export interface SearchTerms {
  brands: string;
  models: string;
  generations: string;
  engines: string;
  tuning: string;
  firmware: string;
}

export interface RemoveIconHoverState {
  brand: boolean;
  model: boolean;
  generation: boolean;
  engine: boolean;
  tuningOption: boolean;
  firmware: boolean;
}

export interface ContentCardProps {
  children: React.ReactNode;
  delay: number;
  className?: string;
  onClick?: () => void;
  variant?: 'default' | 'detailed' | 'tuningOption' | 'firmwareOption' | 'unavailable';

}

export interface TuningOptionWithCount extends TuningOption {
  count: number;
}