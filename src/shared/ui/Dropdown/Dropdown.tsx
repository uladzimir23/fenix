// src/shared/ui/Dropdown/Dropdown.tsx
import React, { useState, useRef, useEffect } from 'react';
import { FaChevronDown, FaCheck, FaTimes } from 'react-icons/fa';
import Icon from '@/shared/ui/Icon/Icon';
import styles from './Dropdown.module.scss';

interface DropdownOption {
  value: string;
  label: string;
}

interface DropdownProps {
  options: DropdownOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export const Dropdown: React.FC<DropdownProps> = ({
  options,
  value,
  onChange,
  placeholder = 'Выберите...',
  className = ''
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isRemoveHovered, setIsRemoveHovered] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Сброс состояния при изменении значения
  useEffect(() => {
    setIsRemoveHovered(false);
  }, [value]);

  const selectedOption = options.find(option => option.value === value);
  const hasValue = value !== 'all' && value !== '';

  const handleOptionClick = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  const handleRemoveClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange('all');
    // Принудительно сбрасываем состояние
    setIsRemoveHovered(false);
  };

  const handleDropdownClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div 
      ref={dropdownRef}
      className={`${styles.dropdown} ${className} ${isOpen ? styles.open : ''} ${
        isHovered ? styles.hovered : ''
      } ${isRemoveHovered ? styles.removeHovered : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setIsRemoveHovered(false); // Сбрасываем и это состояние
      }}
    >
      <div 
        className={styles.dropdownHeader}
        onClick={handleDropdownClick}
      >
        <div className={styles.headerContent}>
          <span className={styles.selectedValue}>
            {selectedOption?.label || placeholder}
          </span>
          {hasValue && isHovered && (
            <div 
              className={styles.removeIconContainer}
              onMouseEnter={() => setIsRemoveHovered(true)}
              onMouseLeave={() => setIsRemoveHovered(false)}
              onClick={handleRemoveClick}
            >
              <Icon 
                icon={FaTimes} 
                className={styles.removeIcon}
              />
            </div>
          )}
        </div>
        <Icon 
          icon={FaChevronDown} 
          className={`${styles.chevron} ${isOpen ? styles.rotated : ''}`}
        />
      </div>
      
      <div className={`${styles.dropdownMenu} ${isOpen ? styles.open : ''}`}>
        <div className={styles.menuContent}>
          {options.map((option) => (
            <div
              key={option.value}
              className={`${styles.dropdownItem} ${
                option.value === value ? styles.selected : ''
              }`}
              onClick={() => handleOptionClick(option.value)}
            >
              <span className={styles.optionLabel}>{option.label}</span>
              {option.value === value && (
                <Icon icon={FaCheck} className={styles.checkIcon} />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};