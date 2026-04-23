import React, { useMemo } from 'react';
import { ReactFlow, Background, Controls } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { Automaton, StateId } from '../core/types';
import { automatonToReactFlow } from '../core/mapper';
import { StateNode } from './StateNode';

const nodeTypes = {
  stateNode: StateNode,
};

interface CanvasProps {
  automaton: Automaton | null;
  activeStates: Set<StateId>;
}

export const Canvas: React.FC<CanvasProps> = ({ automaton, activeStates }) => {
  const { nodes, edges } = useMemo(() => {
    return automatonToReactFlow(automaton, activeStates);
  }, [automaton, activeStates]);

  return (
    <div className="canvas-container glass-panel">
      <ReactFlow 
        nodes={nodes} 
        edges={edges} 
        nodeTypes={nodeTypes}
        fitView
      >
        <Background gap={16} />
        <Controls />
      </ReactFlow>
    </div>
  );
};
