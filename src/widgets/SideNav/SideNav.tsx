// src/widgets/SideNav/SideNav.tsx
import React from 'react';
import { LogoSection } from './components/LogoSection/LogoSection';
import { NavSection } from './components/NavSection/NavSection';
import { UserProfile } from './components/UserProfile/UserProfile';
import { useSideNav } from '@/app/providers/SideNavProvider/SideNavProvider';
import { ThemeToggle } from '@/shared/components/ThemeToggle/ThemeToggle';
import styles from './SideNav.module.scss';

export const SideNav: React.FC = () => {
  const { isExpanded, setIsExpanded } = useSideNav();

  const handleMouseEnter = () => {
    setIsExpanded(true);
  };

  const handleMouseLeave = () => {
    setIsExpanded(false);
  };

  return (
    <div 
      className={`${styles.sideNav} ${isExpanded ? styles.expanded : styles.collapsed}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className={styles.navContent}>
        <LogoSection isExpanded={isExpanded} />
        
        <NavSection isExpanded={isExpanded} />

        <ThemeToggle />

        <div className={styles.divider} />

        <UserProfile isExpanded={isExpanded} />
      </div>
    </div>
  );
};