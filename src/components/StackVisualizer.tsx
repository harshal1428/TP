import React from 'react';
import './StackVisualizer.css';

interface StackVisualizerProps {
  stack: string[];
}

export const StackVisualizer: React.FC<StackVisualizerProps> = ({ stack }) => {
  return (
    <div className="stack-container">
      <div className="stack-items">
        {stack.length === 0 && <div className="stack-empty">Empty</div>}
        {stack.map((item, index) => (
          <div key={`${index}-${item}`} className="stack-item glass-panel">
            {item}
          </div>
        )).reverse()} {/* Top of stack at the top */}
      </div>
      <div className="stack-label">Stack (Top on Top)</div>
    </div>
  );
};
