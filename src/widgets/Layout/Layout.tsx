// src/widgets/Layout/Layout.tsx
import React from 'react';
import { SideNav } from '../SideNav/SideNav';
import { useSideNav } from '@/app/providers/SideNavProvider/SideNavProvider';
import styles from './Layout.module.scss';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { isExpanded } = useSideNav();

  return (
    <div className={styles.layout}>
      <SideNav />
      <main className={`${styles.mainContent} ${isExpanded ? styles.expanded : styles.collapsed}`}>
        {children}
      </main>
    </div>
  );
};