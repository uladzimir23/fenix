// src/shared/api/types/auth.ts
export interface UserProfile {
    id: number;
    email: string;
    firstName?: string;
    lastName?: string;
    role: 'USER' | 'ADMIN';
    createdAt: string;
  }
  
  export interface LoginCredentials {
    email: string;
    password: string;
  }
  
  export interface LoginResponse {
    accessToken: string;
    refreshToken: string;
  }