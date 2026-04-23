# Phase 2 Research: DFA & NFA Engines Implementation

## Objective
Design the core execution engine and visualization mapper for Deterministic and Non-deterministic Finite Automata, ensuring decoupling of state logic from React Flow UI.

## Findings
1. **State Management Hook**: We need a `useFiniteAutomaton` hook that encapsulates the execution state:
   - `input`: The string being processed.
   - `pointer`: Current index in the string.
   - `activeStates`: `Set<StateId>` (Set because NFA can be in multiple states simultaneously; DFA is just a set of size 1).
   - `status`: `'idle' | 'running' | 'accepted' | 'rejected'`.

2. **Transition Logic**:
   - DFA transition is deterministic: given state `q` and symbol `a`, exactly one state `q'` (or zero, meaning dead state/reject).
   - NFA transition: given state `q` and symbol `a`, multiple states `Q'` can be reached. We must also compute the $\epsilon$-closure of states. Whenever active states change, we must compute their $\epsilon$-closure.

3. **React Flow Mapper**:
   - We need utility functions: `automatonToReactFlow(automaton: Automaton, activeStates: Set<StateId>)`.
   - `Nodes`: Need a custom node type `stateNode` that visually highlights if it is in `activeStates`. It also needs to show if it is an initial or final state.
   - `Edges`: Need custom highlighting.

4. **Integration with UI Shell**:
   - For Phase 2, we should implement a sample DFA and NFA to test the engine without needing the full drag-and-drop rule definition UI yet.

## Decisions
1. Use a unified `useFiniteAutomaton` hook for both DFA and NFA, treating DFA as an NFA that just happens to be deterministic.
2. Implement epsilon-closure calculation as a core pure function.
3. Add sample predefined automata to test the execution step-by-step.
