// src/shared/components/ThemeToggle/ThemeToggle.tsx
import React from 'react';
import { FaMoon, FaSun } from 'react-icons/fa6';
import Icon from '@/shared/ui/Icon/Icon';
import { useTheme } from '@/shared/hooks/useTheme';
import { useSideNav } from '@/app/providers/SideNavProvider/SideNavProvider';
import styles from './ThemeToggle.module.scss';

export const ThemeToggle: React.FC = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const { isExpanded } = useSideNav();

  return (
    <div className={styles.themeSwitcher}>
      {isExpanded ? (
        // Полная версия при расширенном состоянии
        <>
          <div
            className={`${styles.themeOption} ${isDarkMode ? styles.active : ''}`}
            onClick={() => isDarkMode && toggleTheme()}
          >
            <Icon icon={FaSun} className={styles.themeIcon}/>
            <span>Светлая тема</span>
          </div>
          <div
            className={`${styles.themeOption} ${!isDarkMode ? styles.active : ''}`}
            onClick={() => !isDarkMode && toggleTheme()}
          >
            <Icon icon={FaMoon} className={styles.themeIcon}/>
            <span>Темная тема</span>
          </div>
        </>
      ) : (
        // Компактная версия при сжатом состоянии
        <div
          className={styles.compactToggle}
          onClick={toggleTheme}
          title={isDarkMode ? 'Переключить на светлую тему' : 'Переключить на темную тему'}
        >
          <Icon icon={isDarkMode ? FaSun : FaMoon} className={styles.themeIcon}/>
        </div>
      )}
    </div>
  );
};