import React from 'react';
import { ReactFlow, Background, Controls } from '@xyflow/react';
import '@xyflow/react/dist/style.css';

export const Canvas: React.FC = () => {
  return (
    <div style={{ flex: 1, position: 'relative' }}>
      <ReactFlow 
        nodes={[]} 
        edges={[]}
        fitView
        colorMode="dark"
      >
        <Background color="#334155" gap={16} />
        <Controls />
      </ReactFlow>
    </div>
  );
};
