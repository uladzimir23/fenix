import React, { RefObject } from 'react';
import styles from './ResultsContent.module.scss';

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
  const resultsContentClass = `${styles.resultsContent} ${
    hasScroll ? styles.hasScroll : styles.noScroll
  } ${isScrolling ? styles.scrolling : ''}`;

  return (
    <div className={resultsContentClass} ref={resultsContentRef}>
      {hasScroll && <div className={`${styles.fadeOverlay} ${styles.topFade}`}></div>}
      {children}
      {hasScroll && <div className={`${styles.fadeOverlay} ${styles.bottomFade}`}></div>}
    </div>
  );
};