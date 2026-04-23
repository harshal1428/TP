---
phase: 2
plan: 3
wave: 2
---

# Plan 2.3: Integration & Sample Automata

## Objective
Wire the engine hook, mapper, and UI components together so users can step through an automaton simulation in the browser.

## Context
- src/App.tsx
- src/components/Sidebar.tsx
- src/components/Canvas.tsx
- src/core/mapper.ts
- src/hooks/useFiniteAutomaton.ts

## Tasks

<task type="auto">
  <name>Create Sample Automata</name>
  <files>src/core/samples.ts</files>
  <action>
    - Create `src/core/samples.ts`.
    - Define a sample DFA (e.g., accepts strings ending in 'ab'). Include visual `position` coordinates for states.
    - Define a sample NFA (e.g., contains 'a' followed by 'b' using epsilon transitions).
    - Export these for use in the UI.
  </action>
  <verify>Test-Path src/core/samples.ts</verify>
  <done>Samples are fully defined, valid Automaton objects with visual coordinates.</done>
</task>

<task type="auto">
  <name>Integrate Canvas and Engine</name>
  <files>src/App.tsx, src/components/Canvas.tsx, src/components/Sidebar.tsx</files>
  <action>
    - Lift state up to `App.tsx` or handle it inside `Canvas.tsx`.
    - In `App.tsx`, instantiate `useFiniteAutomaton` with a selected sample automaton.
    - Pass `currentStates` down to `Canvas`, which uses `automatonToReactFlow` to render nodes/edges.
    - Wire the `Step` button and Input field in `Sidebar.tsx` to the hook's `step()` and `reset()` methods.
    - Display current input string and pointer position in the Sidebar.
    - Display Accept/Reject status prominently when finished.
  </action>
  <verify>Test-Path src/App.tsx</verify>
  <done>UI correctly steps through automaton, updating visual graph and active states dynamically.</done>
</task>

## Success Criteria
- [ ] Pressing "Step" advances the input pointer.
- [ ] The active state node(s) glow correctly on the canvas per step.
- [ ] Engine correctly halts and reports Accept or Reject status.
