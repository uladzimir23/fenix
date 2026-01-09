// src/shared/ui/Dropdown/components/CarDependencyChain.tsx
import React, { useMemo } from 'react';
import { CarBrand } from '@/shared/lib/data/car-data/types';
import { carDataService } from '@/shared/lib/data/car-data/car-data-service';
import { Dropdown } from '../Dropdown';
import { SearchableDropdown } from './SearchableDropdown';
import { SearchableDropdownWithLogos } from './SearchableDropdownWithLogos';
import { CarSelection, CarDependencyChainProps } from '../types/dropdown.types';

export const CarDependencyChain: React.FC<CarDependencyChainProps> = ({
  selection,
  onSelectionChange,
  carBrands,
  disabled = false
}) => {
  const handleSelectionChange = (key: keyof CarSelection, value: string) => {
    const newSelection = { ...selection, [key]: value };
    
    // Сбрасываем зависимые поля при изменении родительского
    if (key === 'brand' && value === 'all') {
      newSelection.model = 'all';
      newSelection.generation = 'all';
      newSelection.engine = 'all';
    } else if (key === 'brand') {
      newSelection.model = 'all';
      newSelection.generation = 'all';
      newSelection.engine = 'all';
    } else if (key === 'model' && value === 'all') {
      newSelection.generation = 'all';
      newSelection.engine = 'all';
    } else if (key === 'model') {
      newSelection.generation = 'all';
      newSelection.engine = 'all';
    } else if (key === 'generation' && value === 'all') {
      newSelection.engine = 'all';
    }

    onSelectionChange(newSelection);
  };

  // Опции для брендов
  const brandOptions = useMemo(() => [
    { value: 'all', label: 'Все марки' },
    ...carBrands
      .filter((brand: CarBrand) => brand && brand.name !== 'all')
      .sort((a: CarBrand, b: CarBrand) => a.name.localeCompare(b.name))
      .map((brand: CarBrand) => ({
        value: brand.name,
        label: brand.name,
        logo: brand.logo
      }))
  ], [carBrands]);

  // Опции для моделей
  const modelOptions = useMemo(() => {
    if (selection.brand === 'all' || !carDataService.hasBrandData(selection.brand)) {
      return [];
    }
    
    const models = carDataService.getModels(selection.brand);
    return [
      { value: 'all', label: 'Все модели' },
      ...models
        .filter((model) => model && model.name !== 'all')
        .sort((a, b) => a.name.localeCompare(b.name))
        .map((model) => ({
          value: model.name,
          label: model.name
        }))
    ];
  }, [selection.brand]);

  // Опции для поколений
  const generationOptions = useMemo(() => {
    if (selection.brand === 'all' || selection.model === 'all' || !carDataService.hasBrandData(selection.brand)) {
      return [];
    }
    
    const generations = carDataService.getGenerations(selection.brand, selection.model);
    return [
      { value: 'all', label: 'Все поколения' },
      ...generations
        .filter((gen) => gen && gen.body !== 'all')
        .map((gen) => ({
          value: gen.body,
          label: `${gen.body} (${gen.years})`
        }))
    ];
  }, [selection.brand, selection.model]);

  // Опции для двигателей
  const engineOptions = useMemo(() => {
    if (selection.brand === 'all' || selection.model === 'all' || selection.generation === 'all' || !carDataService.hasBrandData(selection.brand)) {
      return [];
    }
    
    const engines = carDataService.getEngines(selection.brand, selection.model, selection.generation);
    return [
      { value: 'all', label: 'Все двигатели' },
      ...engines
        .filter((engine: string) => engine && engine !== 'all')
        .map((engine: string) => ({
          value: engine,
          label: engine
        }))
    ];
  }, [selection.brand, selection.model, selection.generation]);

  // Проверяем, есть ли данные для выбранного бренда
  const hasBrandData = selection.brand !== 'all' && carDataService.hasBrandData(selection.brand);
  const noDataMessage = selection.brand !== 'all' && !hasBrandData ? 
    'Для выбранной марки нет детальных данных' : undefined;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
      {/* Бренд - всегда активен */}
      <SearchableDropdownWithLogos
        options={brandOptions}
        value={selection.brand}
        onChange={(value) => handleSelectionChange('brand', value)}
        placeholder="Выберите марку..."
        searchPlaceholder="Поиск марки..."
        maxHeight={400}
        disabled={disabled}
      />

      {/* Модель - зависит от выбора бренда */}
      <SearchableDropdown
        options={modelOptions}
        value={selection.model}
        onChange={(value) => handleSelectionChange('model', value)}
        placeholder="Выберите модель..."
        searchPlaceholder="Поиск модели..."
        maxHeight={350}
        disabled={disabled}
        dependencies={{
          enabled: selection.brand !== 'all' && hasBrandData,
          //message: selection.brand === 'all' ? 'Сначала выберите марку' : undefined
        }}
      />

      {/* Поколение - зависит от выбора модели */}
      <Dropdown
        options={generationOptions}
        value={selection.generation}
        onChange={(value) => handleSelectionChange('generation', value)}
        placeholder="Выберите поколение..."
        disabled={disabled}
        dependencies={{
          enabled: selection.model !== 'all' && hasBrandData,
        }}
      />

      {/* Двигатель - зависит от выбора поколения */}
      <Dropdown
        options={engineOptions}
        value={selection.engine}
        onChange={(value) => handleSelectionChange('engine', value)}
        placeholder="Выберите двигатель..."
        disabled={disabled}
        dependencies={{
          enabled: selection.generation !== 'all' && hasBrandData,
        }}
      />
    </div>
  );
};