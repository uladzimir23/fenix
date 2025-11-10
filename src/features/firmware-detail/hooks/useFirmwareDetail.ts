// src/features/firmware-detail/hooks/useFirmwareDetail.ts
import { useState, useEffect } from 'react';
import { AnimationState } from '../types/firmware-detail.types';

export const useFirmwareDetail = (onClose: () => void) => {
  const [animation, setAnimation] = useState<AnimationState>({
    isVisible: false,
    isClosing: false
  });

  useEffect(() => {
    setTimeout(() => {
      setAnimation(prev => ({ ...prev, isVisible: true }));
    }, 10);
  }, []);

  const handleClose = () => {
    setAnimation(prev => ({ ...prev, isClosing: true }));
    setTimeout(() => onClose(), 300);
  };

  return {
    animation,
    handleClose
  };
};