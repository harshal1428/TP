---
phase: 3
plan: 1
wave: 1
---

# Plan 3.1: PDA Core Engine Logic

## Objective
Implement the pure computational logic for Pushdown Automata transitions, tracking multiple configurations (state + stack), and wrap it in a custom React hook.

## Context
- .gsd/SPEC.md
- .gsd/phases/3/RESEARCH.md
- src/core/types.ts

## Tasks

<task type="auto">
  <name>PDA Engine Pure Functions</name>
  <files>src/core/engine-pda.ts, src/core/types.ts</files>
  <action>
    - Ensure `types.ts` has a clear `PDAConfiguration` type: `{ stateId: StateId, stack: string[] }`.
    - Create `src/core/engine-pda.ts`.
    - Implement `computePDANextConfigs(pda: PDA, currentConfigs: PDAConfiguration[], symbol: Symbol): PDAConfiguration[]`.
    - Ensure pop/push logic correctly matches stack tops. Empty string `""` for popSymbol means "don't pop" (or pop epsilon).
    - Implement `isPDAAccepted(pda: PDA, configs: PDAConfiguration[]): boolean` (by final state).
  </action>
  <verify>Test-Path src/core/engine-pda.ts</verify>
  <done>Functions are implemented and correctly type-checked.</done>
</task>

<task type="auto">
  <name>Custom PDA React Hook</name>
  <files>src/hooks/usePushdownAutomaton.ts</files>
  <action>
    - Create `src/hooks/usePushdownAutomaton.ts`.
    - Similar to `useFiniteAutomaton`, but manages `activeConfigs: PDAConfiguration[]` instead of `currentStates`.
    - Expose the same `step()`, `reset()`, `input`, `pointer`, `status` interface so it can be swapped easily.
    - Also expose a derived `currentStates: Set<StateId>` based on the active configs to keep `Canvas` highlighting compatible.
  </action>
  <verify>Test-Path src/hooks/usePushdownAutomaton.ts</verify>
  <done>Hook is created with correct state and step/reset methods for PDA.</done>
</task>

## Success Criteria
- [ ] PDA configurations correctly update state and stack arrays on transitions.
- [ ] React hook properly manages input pointer and active configurations.
