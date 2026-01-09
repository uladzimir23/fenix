// src/shared/ui/Dropdown/Dropdown.tsx
import React, { useState } from 'react';
import { BaseDropdown } from './components/BaseDropdown';
import { DropdownOption, DropdownBaseProps } from './types/dropdown.types';

interface DropdownProps extends DropdownBaseProps {
  options: DropdownOption[];
}

export const Dropdown: React.FC<DropdownProps> = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <BaseDropdown
      {...props}
      onOpen={handleOpen}
      onClose={handleClose}
    />
  );
};