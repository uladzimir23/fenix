import React from 'react';
import { AnimatedCard } from '../../AnimatedCard/AnimatedCard';
import styles from './EngineGrid.module.scss';

interface EngineGridProps {
  engines: string[];
  onEngineSelect: (engine: string) => void;
  getFirmwareCountByEngine: (engine: string) => number;
}

export const EngineGrid: React.FC<EngineGridProps> = ({
  engines,
  onEngineSelect,
  getFirmwareCountByEngine
}) => {
  return (
    <div className={styles.contentGrid}>
      {engines.map((engine, index) => {
        const count = getFirmwareCountByEngine(engine);
        return (
          <AnimatedCard
            key={index}
            delay={index * 50}
            onClick={() => onEngineSelect(engine)}
            className={styles.engineCard}
          >
            <div className={styles.firmwareCountBadge}>
              {count}
            </div>
            <h3>{engine}</h3>
            <p>{count} прошивок</p>
          </AnimatedCard>
        );
      })}
    </div>
  );
};
