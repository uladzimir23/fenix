// src/widgets/SideNav/components/NavSection/NavSection.tsx
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  FaUser, FaMagnifyingGlass, FaFolderOpen, FaMessage, FaGear 
} from 'react-icons/fa6';
import Icon from '@/shared/ui/Icon/Icon';
import { IconType } from 'react-icons';
import styles from './NavSection.module.scss';

interface NavItem {
  id: number;
  icon: IconType;
  label: string;
  path: string;
  badge?: number;
}

interface NavSectionProps {
  isExpanded: boolean;
}

export const NavSection: React.FC<NavSectionProps> = ({ isExpanded }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems: NavItem[] = [
    { id: 1, icon: FaUser, label: 'Профиль', path: '/profile' },
    { id: 2, icon: FaMagnifyingGlass, label: 'Каталог', path: '/catalog' },
    { id: 3, icon: FaFolderOpen, label: 'Ваши файлы', path: '/files' },
    { id: 4, icon: FaMessage, label: 'Сообщения', path: '/messages', badge: 12 },
    { id: 5, icon: FaGear, label: 'test-api', path: '/test-api' },
  ];

  const getActivePage = (): number => {
    const path = location.pathname;
    if (path === '/profile') return 1;
    if (path === '/catalog') return 2;
    if (path === '/files') return 3;
    if (path === '/messages') return 4;
    if (path === '/test-api') return 5;
    return 1;
  };

  const selectedNav = getActivePage();

  const handleItemClick = (path: string) => {
    navigate(path);
  };

  return (
    <div className={styles.navSection}>
      {navItems.map((item) => (
        <div
          key={item.id}
          className={`${styles.navItem} ${selectedNav === item.id ? styles.active : ''} ${
            !isExpanded ? styles.collapsed : ''
          }`}
          onClick={() => handleItemClick(item.path)}
          title={!isExpanded ? item.label : ''} // Показываем tooltip в сжатом состоянии
        >
          <Icon icon={item.icon} className={styles.navIcon}/>
          {isExpanded && (
            <>
              <span className={styles.navLabel}>{item.label}</span>
              {item.badge && (
                <span className={styles.badge}>{item.badge}</span>
              )}
            </>
          )}
        </div>
      ))}
    </div>
  );
};