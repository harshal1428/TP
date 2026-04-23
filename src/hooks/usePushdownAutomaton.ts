import { useState, useCallback, useEffect, useMemo } from 'react';
import { PDA, PDAConfiguration, StateId } from '../core/types';
import { computePDANextConfigs, isPDAAccepted } from '../core/engine-pda';

export type AutomatonStatus = 'idle' | 'running' | 'accepted' | 'rejected';

export function usePushdownAutomaton(pda: PDA | null) {
  const [input, setInput] = useState('');
  const [pointer, setPointer] = useState(0);
  const [activeConfigs, setActiveConfigs] = useState<PDAConfiguration[]>([]);
  const [status, setStatus] = useState<AutomatonStatus>('idle');

  // Derive currentStates for visualization compatibility
  const currentStates = useMemo(() => {
    return new Set(activeConfigs.map(c => c.stateId));
  }, [activeConfigs]);

  // Initialize
  useEffect(() => {
    if (!pda) return;
    
    const initialConfigs: PDAConfiguration[] = [];
    for (const stateId in pda.states) {
      if (pda.states[stateId].isInitial) {
        initialConfigs.push({
          stateId,
          stack: [] // Start with empty stack
        });
      }
    }

    // Apply initial epsilon transitions
    const startConfigs = computePDANextConfigs(pda, initialConfigs, "");
    setActiveConfigs(startConfigs.length > 0 ? startConfigs : initialConfigs);
    setPointer(0);
    setStatus('idle');
  }, [pda]);

  const reset = useCallback((newInput?: string) => {
    if (newInput !== undefined) {
      setInput(newInput);
    }
    setPointer(0);
    setStatus('idle');
    
    if (pda) {
      const initialConfigs: PDAConfiguration[] = [];
      for (const stateId in pda.states) {
        if (pda.states[stateId].isInitial) {
          initialConfigs.push({
            stateId,
            stack: []
          });
        }
      }
      const startConfigs = computePDANextConfigs(pda, initialConfigs, "");
      setActiveConfigs(startConfigs.length > 0 ? startConfigs : initialConfigs);
    } else {
      setActiveConfigs([]);
    }
  }, [pda]);

  const step = useCallback(() => {
    if (!pda || status === 'accepted' || status === 'rejected') return;

    if (status === 'idle') {
      setStatus('running');
    }

    if (pointer >= input.length) {
      // End of input reached
      const accepted = isPDAAccepted(pda, activeConfigs);
      setStatus(accepted ? 'accepted' : 'rejected');
      return;
    }

    const symbol = input[pointer];
    const nextConfigs = computePDANextConfigs(pda, activeConfigs, symbol);

    setActiveConfigs(nextConfigs);
    setPointer(prev => prev + 1);

    if (nextConfigs.length === 0) {
      setStatus('rejected');
    }
  }, [pda, input, pointer, activeConfigs, status]);

  return {
    input,
    pointer,
    activeConfigs,
    currentStates,
    status,
    step,
    reset,
    setInput
  };
}
