import React, { RefObject } from 'react';
import { CarFilterState } from '../../types/car-filter.types';
import { ResultsHeader } from './ResultsHeader/ResultsHeader';
import { ResultsContent } from './ResultsContent/ResultsContent';
import styles from './ResultsPanel.module.scss';

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
    <div className={styles.resultsPanel}>
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