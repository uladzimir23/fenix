// src/widgets/SideNav/components/LogoSection/LogoSection.tsx
import React from 'react';
import { FaThLarge as FaThLargeLegacy } from 'react-icons/fa';
import Icon from '@/shared/ui/Icon/Icon';
import { useNavigate } from 'react-router-dom';
import styles from './LogoSection.module.scss';

interface LogoSectionProps {
  isExpanded: boolean;
}

export const LogoSection: React.FC<LogoSectionProps> = ({ isExpanded }) => {
  const navigate = useNavigate();

  return (
    <div className={styles.logoSection} onClick={() => navigate('/')}>
      <Icon icon={FaThLargeLegacy} className={styles.logoIcon}/>
      {isExpanded && <span className={styles.logoText}>Fenix</span>}
    </div>
  );
};