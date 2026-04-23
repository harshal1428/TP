import React from 'react';
import { ReactFlow, Background, Controls } from '@xyflow/react';
import '@xyflow/react/dist/style.css';

export const Canvas: React.FC = () => {
  return (
    <div className="canvas-container glass-panel">
      <ReactFlow defaultNodes={[]} defaultEdges={[]}>
        <Background gap={16} />
        <Controls />
      </ReactFlow>
    </div>
  );
};
