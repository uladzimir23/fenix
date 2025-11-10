// src/widgets/SideNav/SideNav.tsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './SideNav.module.scss';

export const SideNav: React.FC = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Главная', icon: '🏠' },
    { path: '/catalog', label: 'Каталог', icon: '📁' },
    { path: '/files', label: 'Файлы', icon: '📄' },
    { path: '/messages', label: 'Сообщения', icon: '💬' },
    { path: '/profile', label: 'Профиль', icon: '👤' },
  ];

  return (
    <nav className={styles.sideNav}>
      <div className={styles.logo}>
        <h2>Fenix</h2>
      </div>
      <ul className={styles.navList}>
        {navItems.map((item) => (
          <li key={item.path} className={styles.navItem}>
            <Link
              to={item.path}
              className={`${styles.navLink} ${
                location.pathname === item.path ? styles.active : ''
              }`}
            >
              <span className={styles.icon}>{item.icon}</span>
              <span className={styles.label}>{item.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};