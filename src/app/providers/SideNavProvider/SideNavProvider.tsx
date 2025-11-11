// src/app/providers/SideNavProvider.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface SideNavContextType {
  isExpanded: boolean;
  setIsExpanded: (expanded: boolean) => void;
}

const SideNavContext = createContext<SideNavContextType | undefined>(undefined);

export const useSideNav = () => {
  const context = useContext(SideNavContext);
  if (!context) {
    throw new Error('useSideNav must be used within SideNavProvider');
  }
  return context;
};

interface SideNavProviderProps {
  children: ReactNode;
}

export const SideNavProvider: React.FC<SideNavProviderProps> = ({ children }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <SideNavContext.Provider value={{ isExpanded, setIsExpanded }}>
      {children}
    </SideNavContext.Provider>
  );
};