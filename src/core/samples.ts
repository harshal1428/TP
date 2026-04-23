import { Automaton } from './types';

// DFA: Accepts strings ending in 'ab'
export const sampleDFA: Automaton = {
  alphabet: new Set(['a', 'b']),
  states: {
    'q0': { id: 'q0', label: 'q0', isInitial: true, isFinal: false, position: { x: 100, y: 200 } },
    'q1': { id: 'q1', label: 'q1', isInitial: false, isFinal: false, position: { x: 300, y: 200 } },
    'q2': { id: 'q2', label: 'q2', isInitial: false, isFinal: true, position: { x: 500, y: 200 } },
  },
  transitions: {
    't1': { id: 't1', source: 'q0', target: 'q1', symbol: 'a' },
    't2': { id: 't2', source: 'q0', target: 'q0', symbol: 'b' },
    't3': { id: 't3', source: 'q1', target: 'q1', symbol: 'a' },
    't4': { id: 't4', source: 'q1', target: 'q2', symbol: 'b' },
    't5': { id: 't5', source: 'q2', target: 'q1', symbol: 'a' },
    't6': { id: 't6', source: 'q2', target: 'q0', symbol: 'b' },
  }
};

// NFA: Accepts strings containing 'ab'
export const sampleNFA: Automaton = {
  alphabet: new Set(['a', 'b']),
  states: {
    's0': { id: 's0', label: 's0', isInitial: true, isFinal: false, position: { x: 100, y: 200 } },
    's1': { id: 's1', label: 's1', isInitial: false, isFinal: false, position: { x: 300, y: 200 } },
    's2': { id: 's2', label: 's2', isInitial: false, isFinal: true, position: { x: 500, y: 200 } },
  },
  transitions: {
    'n1': { id: 'n1', source: 's0', target: 's0', symbol: 'a' },
    'n2': { id: 'n2', source: 's0', target: 's0', symbol: 'b' },
    'n3': { id: 'n3', source: 's0', target: 's1', symbol: 'a' }, // Non-deterministic
    'n4': { id: 'n4', source: 's1', target: 's2', symbol: 'b' },
    'n5': { id: 'n5', source: 's2', target: 's2', symbol: 'a' },
    'n6': { id: 'n6', source: 's2', target: 's2', symbol: 'b' },
  }
};
