// src/widgets/Layout/Layout.tsx
import React from 'react';
import { SideNav } from '../SideNav/SideNav';
import styles from './Layout.module.scss';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className={styles.layout}>
      <SideNav />
      <main className={styles.mainContent}>
        {children}
      </main>
    </div>
  );
};