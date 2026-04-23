/**
 * Core Data Structures for Automata Engine
 * Completely decoupled from the UI (React/ReactFlow).
 */

export type AutomatonType = 'DFA' | 'NFA' | 'PDA' | 'TM';

export interface State {
  id: string;
  name: string;
  isInitial: boolean;
  isFinal: boolean;
  isDead?: boolean; // Trapping state
}

/** 
 * A generalized transition interface.
 * For DFA: symbol matches input, nextState is single.
 * For NFA: symbol can be epsilon (empty), nextStates is an array/set.
 * For PDA: popSymbol and pushSymbols are used.
 */
export interface Transition {
  id: string;
  fromStateId: string;
  toStateId: string;
  symbol: string | null; // null represents epsilon (ε)
  popSymbol?: string | null; // For PDA
  pushSymbols?: string[]; // For PDA
}

export interface AutomatonDefinition {
  type: AutomatonType;
  states: State[];
  transitions: Transition[];
  alphabet: string[];
  stackAlphabet?: string[]; // For PDA
}

export interface StepResult {
  activeStateIds: string[]; // Current active states (multiple for NFA)
  stack: string[]; // For PDA
  inputPointer: number;
  isAccepted: boolean | null; // null if not finished yet
}
