// src/features/car-filter/components/ContentGrid/EngineGrid.tsx
import React from 'react';
import { AnimatedCard } from '../AnimatedCard/AnimatedCard';

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
    <div className="content-grid">
      {engines.map((engine, index) => {
        const count = getFirmwareCountByEngine(engine);
        return (
          <AnimatedCard
            key={index}
            delay={index * 50}
            onClick={() => onEngineSelect(engine)}
          >
            <div className="firmware-count-badge">
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