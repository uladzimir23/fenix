// src/pages/Home/Home.tsx
import React from 'react';
import { Container } from '@/shared/ui/Layout/Container/Container';
import { Typography } from '@/shared/ui/Typography/Typography';
import styles from './Home.module.scss';

export const Home: React.FC = () => {
  return (
    <div className={styles.home}>
      <Container>
        <Typography variant="h1">Добро пожаловать в Fenix</Typography>
        <Typography variant="body">
          Файлообменник для автомобильных прошивок
        </Typography>
      </Container>
    </div>
  );
};