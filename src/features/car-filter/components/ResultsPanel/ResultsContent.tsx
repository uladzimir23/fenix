// src/features/car-filter/components/ResultsPanel/ResultsContent.tsx
import React, { RefObject } from 'react';

interface ResultsContentProps {
  hasScroll: boolean;
  isScrolling: boolean;
  resultsContentRef: RefObject<HTMLDivElement>;
  children: React.ReactNode;
}

export const ResultsContent: React.FC<ResultsContentProps> = ({
  hasScroll,
  isScrolling,
  resultsContentRef,
  children
}) => {
  const resultsContentClass = `results-content ${hasScroll ? 'has-scroll' : 'no-scroll'} ${isScrolling ? 'scrolling' : ''}`;

  return (
    <div className={resultsContentClass} ref={resultsContentRef}>
      {hasScroll && <div className="fade-overlay top-fade"></div>}
      {children}
      {hasScroll && <div className="fade-overlay bottom-fade"></div>}
    </div>
  );
};