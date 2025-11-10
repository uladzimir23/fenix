// src/app/providers/AuthProvider/AuthProvider.tsx (альтернативная версия)
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { userService, sessionsService, UserProfile, LoginCredentials } from '@/shared/api';
import { useApi } from '@/shared/api/hooks/useApi';

export interface AuthContextType {
  isAuthenticated: boolean;
  user: UserProfile | null;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated: checkAuth, setAuthToken } = useApi();

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        if (checkAuth()) {
          const userProfile = await userService.getProfile();
          setUser(userProfile);
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error('Auth check failed:', error);
      } finally {
        setLoading(false);
      }
    };

    checkAuthentication();
  }, [checkAuth]);

  const login = async (credentials: LoginCredentials) => {
    try {
      const { accessToken, refreshToken } = await sessionsService.login(credentials);
      
      // Используем хук для установки токена
      setAuthToken(accessToken);
      
      const userProfile = await userService.getProfile();
      setUser(userProfile);
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await sessionsService.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setUser(null);
      setIsAuthenticated(false);
    }
  };

  const value = {
    isAuthenticated,
    user,
    login,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};