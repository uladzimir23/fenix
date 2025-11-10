// src/features/car-filter/components/ContentGrid/BrandGrid.tsx
import React from 'react';
import { CarBrand } from '@/shared/lib/data';
import { AnimatedCard } from '../AnimatedCard/AnimatedCard';

interface BrandGridProps {
  brands: CarBrand[];
  onBrandSelect: (brand: CarBrand) => void;
  getFirmwareCountByBrand: (brandName: string) => number;
}

export const BrandGrid: React.FC<BrandGridProps> = ({
  brands,
  onBrandSelect,
  getFirmwareCountByBrand
}) => {
  return (
    <div className="content-grid">
      {brands.map((brand, index) => {
        const count = getFirmwareCountByBrand(brand.name);
        return (
          <AnimatedCard
            key={brand.id}
            delay={index * 20}
            onClick={() => onBrandSelect(brand)}
          >
            <div className="firmware-count-badge">
              {count}
            </div>
            <img src={brand.logo} alt={brand.name} className="content-logo" />
            <h3>{brand.name}</h3>
            <p>{count} прошивок</p>
          </AnimatedCard>
        );
      })}
    </div>
  );
};