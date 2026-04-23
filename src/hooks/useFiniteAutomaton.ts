import { useState, useCallback, useEffect } from 'react';
import { Automaton, StateId } from '../core/types';
import { computeEpsilonClosure, computeNextStates, isAccepted } from '../core/engine';

export type AutomatonStatus = 'idle' | 'running' | 'accepted' | 'rejected';

export function useFiniteAutomaton(automaton: Automaton | null) {
  const [input, setInput] = useState('');
  const [pointer, setPointer] = useState(0);
  const [currentStates, setCurrentStates] = useState<Set<StateId>>(new Set());
  const [status, setStatus] = useState<AutomatonStatus>('idle');

  // Initialize
  useEffect(() => {
    if (!automaton) return;
    
    // Find initial state(s)
    const initialStates = new Set<StateId>();
    for (const stateId in automaton.states) {
      if (automaton.states[stateId].isInitial) {
        initialStates.add(stateId);
      }
    }

    // Apply epsilon closure on initial states
    const startStates = computeEpsilonClosure(automaton, initialStates);
    setCurrentStates(startStates);
    setPointer(0);
    setStatus('idle');
  }, [automaton]);

  const reset = useCallback((newInput?: string) => {
    if (newInput !== undefined) {
      setInput(newInput);
    }
    setPointer(0);
    setStatus('idle');
    
    if (automaton) {
      const initialStates = new Set<StateId>();
      for (const stateId in automaton.states) {
        if (automaton.states[stateId].isInitial) {
          initialStates.add(stateId);
        }
      }
      setCurrentStates(computeEpsilonClosure(automaton, initialStates));
    } else {
      setCurrentStates(new Set());
    }
  }, [automaton]);

  const step = useCallback(() => {
    if (!automaton || status === 'accepted' || status === 'rejected') return;

    if (status === 'idle') {
      setStatus('running');
    }

    if (pointer >= input.length) {
      // End of input reached
      const accepted = isAccepted(automaton, currentStates);
      setStatus(accepted ? 'accepted' : 'rejected');
      return;
    }

    const symbol = input[pointer];
    const nextStates = computeNextStates(automaton, currentStates, symbol);

    setCurrentStates(nextStates);
    setPointer(prev => prev + 1);

    // If we reach a dead state (empty set of next states), we can immediately reject.
    // However, some definitions allow continuing if we want, but typically empty set means reject.
    if (nextStates.size === 0) {
      setStatus('rejected');
    }
  }, [automaton, input, pointer, currentStates, status]);

  return {
    input,
    pointer,
    currentStates,
    status,
    step,
    reset,
    setInput
  };
}
