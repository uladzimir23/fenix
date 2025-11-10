// src/features/firmware-detail/types/firmware-detail.types.ts
import { FirmwareFile } from '@/shared/api';

export interface FirmwareDetailProps {
  firmware: FirmwareFile;
  onClose: () => void;
  onBuy: (firmware: FirmwareFile) => void;
}

export interface AnimationState {
  isVisible: boolean;
  isClosing: boolean;
}