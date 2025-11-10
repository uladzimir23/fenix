// src/pages/Catalog/Catalog.tsx
import React from 'react';
import { Container } from '@/shared/ui/Layout/Container/Container';
import { CarFilter } from '@/features/car-filter';

export const Catalog: React.FC = () => {
  return (
    <div className="page">
      <Container>
        <CarFilter />
      </Container>
    </div>
  );
};