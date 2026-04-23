import { Node, Edge, MarkerType } from '@xyflow/react';
import { Automaton, StateId } from './types';

export function automatonToReactFlow(
  automaton: Automaton | null,
  activeStates: Set<StateId>
): { nodes: Node[]; edges: Edge[] } {
  if (!automaton) return { nodes: [], edges: [] };

  const nodes: Node[] = [];
  const edges: Edge[] = [];

  // Group transitions by source and target to combine labels on the same edge
  const edgeMap = new Map<string, { source: string; target: string; symbols: Set<string> }>();

  for (const transitionId in automaton.transitions) {
    const t = automaton.transitions[transitionId];
    const key = `${t.source}-${t.target}`;
    
    if (!edgeMap.has(key)) {
      edgeMap.set(key, { source: t.source, target: t.target, symbols: new Set() });
    }
    
    // Epsilon is often denoted as ε or λ
    edgeMap.get(key)!.symbols.add(t.symbol === '' ? 'ε' : t.symbol);
  }

  // Create Nodes
  let defaultX = 100;
  for (const stateId in automaton.states) {
    const state = automaton.states[stateId];
    nodes.push({
      id: state.id,
      type: 'stateNode',
      position: state.position || { x: defaultX, y: 200 },
      data: {
        label: state.label,
        isInitial: state.isInitial,
        isFinal: state.isFinal,
        isActive: activeStates.has(state.id),
      },
    });
    defaultX += 150;
  }

  // Create Edges
  for (const [key, data] of edgeMap.entries()) {
    const isSelfLoop = data.source === data.target;
    
    edges.push({
      id: `e-${key}`,
      source: data.source,
      target: data.target,
      label: Array.from(data.symbols).join(', '),
      type: isSelfLoop ? 'step' : 'bezier',
      animated: activeStates.has(data.source), // Animate outgoing edges from active states
      style: {
        stroke: activeStates.has(data.source) ? 'var(--accent-primary)' : 'var(--text-secondary)',
        strokeWidth: activeStates.has(data.source) ? 2 : 1.5,
      },
      labelStyle: { fill: 'var(--text-primary)', fontWeight: 600, fontFamily: 'monospace' },
      labelBgStyle: { fill: 'var(--bg-secondary)', fillOpacity: 0.8 },
      markerEnd: {
        type: MarkerType.ArrowClosed,
        color: activeStates.has(data.source) ? 'var(--accent-primary)' : 'var(--text-secondary)',
      },
    });
  }

  return { nodes, edges };
}
