// src/features/car-filter/components/ResultsPanel/ResultsPanel.tsx
import React, { RefObject } from 'react';
import { CarFilterState } from 'src/features/car-filter/types/car-filter.types.ts';
import { ResultsHeader } from './ResultsHeader';
import { ResultsContent } from './ResultsContent';

interface ResultsPanelProps {
  state: CarFilterState;
  hasScroll: boolean;
  isScrolling: boolean;
  resultsContentRef: RefObject<HTMLDivElement>;
  onClearAll: () => void;
  renderRightContent: () => React.ReactNode;
}

export const ResultsPanel: React.FC<ResultsPanelProps> = ({
  state,
  hasScroll,
  isScrolling,
  resultsContentRef,
  onClearAll,
  renderRightContent
}) => {
  return (
    <div className="results-panel">
      <ResultsHeader state={state} onClearAll={onClearAll} />
      <ResultsContent
        hasScroll={hasScroll}
        isScrolling={isScrolling}
        resultsContentRef={resultsContentRef}
      >
        {renderRightContent()}
      </ResultsContent>
    </div>
  );
};