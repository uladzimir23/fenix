import React from 'react';
import { CarBrand } from '@/shared/lib/data';
import { AnimatedCard } from '../../AnimatedCard/AnimatedCard';
import styles from './BrandGrid.module.scss';


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
    <div className={styles.contentGrid}>
      {brands.map((brand, index) => {
        const count = getFirmwareCountByBrand(brand.name);
        return (
          <AnimatedCard
            key={brand.id}
            delay={index * 20}
            onClick={() => onBrandSelect(brand)}
            className={styles.brandCard}
          >
            <div className={styles.firmwareCountBadge}>
              {count}
            </div>
            <img src={brand.logo} alt={brand.name} className={styles.contentLogo} />
            <h3>{brand.name}</h3>
            <p>{count} прошивок</p>
          </AnimatedCard>
        );
      })}
    </div>
  );
};