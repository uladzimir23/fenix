// src/features/car-filter/hooks/useScrollAnimation.ts
import { useState, useEffect, useRef, RefObject } from 'react';

export const useScrollAnimation = (contentRef: RefObject<HTMLDivElement>) => {
  const [hasScroll, setHasScroll] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollTimeout = useRef<NodeJS.Timeout | undefined>(undefined);

  useEffect(() => {
    const checkScroll = () => {
      if (contentRef.current) {
        setHasScroll(contentRef.current.scrollHeight > contentRef.current.clientHeight);
      }
    };

    checkScroll();
    window.addEventListener('resize', checkScroll);
    
    return () => {
      window.removeEventListener('resize', checkScroll);
    };
  }, [contentRef]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolling(true);
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
      scrollTimeout.current = setTimeout(() => setIsScrolling(false), 500);
    };

    const contentElement = contentRef.current;
    if (contentElement) {
      contentElement.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (contentElement) {
        contentElement.removeEventListener('scroll', handleScroll);
      }
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
    };
  }, [contentRef]);

  return { hasScroll, isScrolling };
};