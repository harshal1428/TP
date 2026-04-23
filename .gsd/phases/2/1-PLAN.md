---
phase: 2
plan: 1
wave: 1
---

# Plan 2.1: Core Engine Logic

## Objective
Implement the pure computational logic for DFA/NFA step transitions, including epsilon-closure calculations, and wrap it in a custom React hook for state management.

## Context
- .gsd/SPEC.md
- .gsd/phases/2/RESEARCH.md
- src/core/types.ts

## Tasks

<task type="auto">
  <name>Engine Pure Functions</name>
  <files>src/core/engine.ts</files>
  <action>
    - Create `src/core/engine.ts`.
    - Implement `computeEpsilonClosure(automaton: Automaton, states: Set<StateId>): Set<StateId>`.
    - Implement `computeNextStates(automaton: Automaton, currentStates: Set<StateId>, symbol: Symbol): Set<StateId>`.
    - Implement `isAccepted(automaton: Automaton, currentStates: Set<StateId>): boolean`.
    - Keep these completely UI-agnostic.
  </action>
  <verify>Test-Path src/core/engine.ts</verify>
  <done>Functions are implemented and correctly type-checked.</done>
</task>

<task type="auto">
  <name>Custom React Hook</name>
  <files>src/hooks/useFiniteAutomaton.ts</files>
  <action>
    - Create `src/hooks/useFiniteAutomaton.ts`.
    - Implement a hook that takes an `Automaton` and an initial input string.
    - Expose state: `currentStates`, `input`, `pointer`, `status` ('idle', 'running', 'accepted', 'rejected').
    - Expose methods: `step()`, `reset(newInput: string)`.
    - Internally use the engine pure functions to calculate next states. Ensure it computes epsilon-closure immediately on start and after each step.
  </action>
  <verify>Test-Path src/hooks/useFiniteAutomaton.ts</verify>
  <done>Hook is created with correct state and step/reset methods.</done>
</task>

## Success Criteria
- [ ] Epsilon closure logic handles $\epsilon$-transitions correctly.
- [ ] React hook properly tracks input string pointer and active state sets.
