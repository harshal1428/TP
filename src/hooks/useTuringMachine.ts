import { useState, useCallback, useEffect, useMemo } from 'react';
import { TuringMachine, StateId } from '../core/types';
import { computeTMStep } from '../core/engine-tm';

export type AutomatonStatus = 'idle' | 'running' | 'accepted' | 'rejected';

export function useTuringMachine(tm: TuringMachine | null) {
  const [input, setInput] = useState('');
  const [tape, setTape] = useState<string[]>([]);
  const [head, setHead] = useState(0);
  const [stateId, setStateId] = useState<StateId>('');
  const [status, setStatus] = useState<AutomatonStatus>('idle');

  // Derive currentStates for visualization compatibility
  const currentStates = useMemo(() => {
    return stateId ? new Set([stateId]) : new Set<StateId>();
  }, [stateId]);

  // Initialize
  useEffect(() => {
    if (!tm) return;
    
    // Find initial state
    let initialId = '';
    for (const sid in tm.states) {
      if (tm.states[sid].isInitial) {
        initialId = sid;
        break;
      }
    }

    setTape(input.split(''));
    setHead(0);
    setStateId(initialId);
    setStatus('idle');
  }, [tm, input]);

  const reset = useCallback((newInput?: string) => {
    if (newInput !== undefined) {
      setInput(newInput);
    }
    setStatus('idle');
    
    if (tm) {
      let initialId = '';
      for (const sid in tm.states) {
        if (tm.states[sid].isInitial) {
          initialId = sid;
          break;
        }
      }
      setTape((newInput !== undefined ? newInput : input).split(''));
      setHead(0);
      setStateId(initialId);
    }
  }, [tm, input]);

  const step = useCallback(() => {
    if (!tm || status === 'accepted' || status === 'rejected') return;

    if (status === 'idle') {
      setStatus('running');
    }

    const next = computeTMStep(tm, stateId, tape, head);

    if (next) {
      setTape(next.tape);
      setHead(next.head);
      setStateId(next.stateId);
      
      // Check if new state is final
      if (tm.states[next.stateId].isFinal) {
        setStatus('accepted');
      }
    } else {
      // No transition found = reject (unless final state check already passed)
      if (tm.states[stateId].isFinal) {
        setStatus('accepted');
      } else {
        setStatus('rejected');
      }
    }
  }, [tm, stateId, tape, head, status]);

  return {
    input,
    tape,
    head,
    stateId,
    currentStates,
    status,
    step,
    reset,
    setInput
  };
}
