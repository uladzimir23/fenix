// src/shared/hooks/useSideNavWidth.ts
import { useSideNav } from '@/app/providers/SideNavProvider/SideNavProvider';

export const useSideNavWidth = () => {
  const { isExpanded } = useSideNav();
  
  const expandedWidth = 272;
  const collapsedWidth = 74;
  
  return {
    currentWidth: isExpanded ? expandedWidth : collapsedWidth,
    isExpanded,
    expandedWidth,
    collapsedWidth
  };
};