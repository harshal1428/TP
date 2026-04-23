import React, { useRef, useEffect } from 'react';
import './TapeVisualizer.css';

interface TapeVisualizerProps {
  tape: string[];
  head: number;
}

export const TapeVisualizer: React.FC<TapeVisualizerProps> = ({ tape, head }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to head
  useEffect(() => {
    if (containerRef.current) {
      const headCell = containerRef.current.children[head] as HTMLElement;
      if (headCell) {
        headCell.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    }
  }, [head]);

  return (
    <div className="tape-container">
      <div className="tape-label">Turing Machine Tape</div>
      <div className="tape-cells" ref={containerRef}>
        {tape.map((cell, index) => (
          <div key={index} className={`tape-cell ${index === head ? 'active' : ''}`}>
            {cell || 'B'}
          </div>
        ))}
      </div>
      <div className="tape-controls-info">Head is at position {head}</div>
    </div>
  );
};
