---
phase: 5
plan: 2
wave: 1
---

# Plan 5.2: Execution Trace Log

## Objective
Implement a detailed execution log that tracks every state transition, allowing users to debug their automata and understand the step-by-step logic.

## Context
- src/hooks/useFiniteAutomaton.ts
- src/hooks/usePushdownAutomaton.ts
- src/hooks/useTuringMachine.ts

## Tasks

<task type="auto">
  <name>Trace State in Hooks</name>
  <files>src/hooks/useFiniteAutomaton.ts, src/hooks/usePushdownAutomaton.ts, src/hooks/useTuringMachine.ts</files>
  <action>
    - Add `trace: TraceEntry[]` to the state of all three hooks.
    - `TraceEntry`: `{ step: number, state: string, symbol: string, description: string }`.
    - Update `step()` to push a new entry to the trace on every successful transition.
  </action>
  <verify>grep "trace" src/hooks/useFiniteAutomaton.ts</verify>
  <done>Hooks now maintain a history of execution steps.</done>
</task>

<task type="auto">
  <name>Trace Log UI Component</name>
  <files>src/components/TraceLog.tsx, src/App.tsx</files>
  <action>
    - Create `src/components/TraceLog.tsx`.
    - Render a list of trace entries in a scrollable panel.
    - Integrate it into `App.tsx`, likely as a bottom drawer or a side panel on the right.
  </action>
  <verify>Test-Path src/components/TraceLog.tsx</verify>
  <done>TraceLog component is implemented and visible in the UI.</done>
</task>

## Success Criteria
- [ ] Every "Step" adds a corresponding entry to the trace log.
- [ ] Trace log clearly shows state transitions and consumed symbols.
