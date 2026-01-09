// src/shared/ui/Dropdown/hooks/useDropdown.ts
import { useState, useRef, useEffect, useCallback } from 'react';

export interface UseDropdownProps {
  onChange: (value: string) => void;
  disabled?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
}

export const useDropdown = ({ 
  onChange, 
  disabled = false,
  onOpen,
  onClose
}: UseDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isRemoveHovered, setIsRemoveHovered] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleOpen = useCallback(() => {
    if (!disabled) {
      setIsOpen(true);
      onOpen?.();
    }
  }, [disabled, onOpen]);

  const handleClose = useCallback(() => {
    setIsOpen(false);
    onClose?.();
  }, [onClose]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        handleClose();
        setIsRemoveHovered(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [handleClose]);

  const handleOptionClick = useCallback((value: string) => {
    if (disabled) return;
    onChange(value);
    handleClose();
    setIsRemoveHovered(false);
  }, [onChange, disabled, handleClose]);

  const handleRemoveClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    if (disabled) return;
    onChange('all');
    setIsRemoveHovered(false);
  }, [onChange, disabled]);

  const handleDropdownClick = useCallback(() => {
    if (disabled) return;
    
    if (isOpen) {
      handleClose();
    } else {
      handleOpen();
    }
    setIsRemoveHovered(false);
  }, [disabled, isOpen, handleOpen, handleClose]);

  return {
    isOpen,
    setIsOpen,
    isHovered,
    setIsHovered,
    isRemoveHovered,
    setIsRemoveHovered,
    dropdownRef,
    handleOptionClick,
    handleRemoveClick,
    handleDropdownClick,
    handleOpen,
    handleClose,
  };
};