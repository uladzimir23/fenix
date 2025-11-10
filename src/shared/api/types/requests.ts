// src/shared/api/types/requests.ts
import { Car } from './cars';
import { TuningOption } from './tuning';

export interface Request {
  id: number;
  status: 'PENDING' | 'PROCESSING' | 'DONE' | 'REJECTED';
  createdAt: string;
  fileUrl: string;
  solutionFileUrl?: string;
  cars: Car[];
  tuningOptions: TuningOption[];
}

export interface CreateRequestData {
  file: File;
}