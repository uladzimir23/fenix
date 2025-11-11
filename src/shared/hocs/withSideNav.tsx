// src/shared/hocs/withSideNav.tsx
import React from 'react';
import { useSideNavWidth } from '../hooks/useSideNavWidth';

export const withSideNav = <P extends object>(
  Component: React.ComponentType<P>
) => {
  return (props: P) => {
    const { isExpanded, currentWidth } = useSideNavWidth();
    
    return (
      <Component 
        {...props} 
        sideNavCollapsed={isExpanded}
        sideNavWidth={currentWidth}
      />
    );
  };
};