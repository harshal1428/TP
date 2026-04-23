---
phase: 4
plan: 1
wave: 1
---

# Plan 4.1: TM Core Engine Logic

## Objective
Implement the pure computational logic for Turing Machine transitions, supporting tape writing and bidirectional head movement, and wrap it in a custom React hook.

## Context
- .gsd/SPEC.md
- .gsd/phases/4/RESEARCH.md
- src/core/types.ts

## Tasks

<task type="auto">
  <name>TM Engine Pure Functions</name>
  <files>src/core/engine-tm.ts</files>
  <action>
    - Create `src/core/engine-tm.ts`.
    - Implement `computeTMStep(tm: TuringMachine, stateId: StateId, tape: string[], head: number): { stateId: StateId, tape: string[], head: number } | null`.
    - Handle write and move logic (L, R, S).
    - Handle blank symbol padding if head moves out of current tape bounds.
  </action>
  <verify>Test-Path src/core/engine-tm.ts</verify>
  <done>Functions are implemented and correctly type-checked.</done>
</task>

<task type="auto">
  <name>Custom TM React Hook</name>
  <files>src/hooks/useTuringMachine.ts</files>
  <action>
    - Create `src/hooks/useTuringMachine.ts`.
    - Manage state: `tape: string[]`, `head: number`, `stateId: StateId`, `status: AutomatonStatus`.
    - Expose `step()`, `reset()`, `input` setter.
    - Derived `currentStates: Set<StateId>` for visualization compatibility.
  </action>
  <verify>Test-Path src/hooks/useTuringMachine.ts</verify>
  <done>Hook is created with correct state and step/reset methods for TM.</done>
</task>

## Success Criteria
- [ ] TM step correctly updates tape and head position.
- [ ] React hook manages the simulation loop and status reporting.
