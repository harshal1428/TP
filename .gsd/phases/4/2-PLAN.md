---
phase: 4
plan: 2
wave: 2
---

# Plan 4.2: Visualization and Integration

## Objective
Create the tape visualization component, define the password strength analyzer TM, and integrate it into the main UI.

## Context
- src/App.tsx
- src/components/Sidebar.tsx
- src/hooks/useTuringMachine.ts

## Tasks

<task type="auto">
  <name>Tape Visualizer Component</name>
  <files>src/components/TapeVisualizer.tsx, src/components/Sidebar.tsx</files>
  <action>
    - Create `src/components/TapeVisualizer.tsx`.
    - Render a horizontal scrollable strip of tape cells.
    - Highlight the cell at `head` index with a "head" indicator (e.g., an arrow or a colored border).
    - In `Sidebar.tsx`, if the active engine is TM, render the `TapeVisualizer`.
  </action>
  <verify>Test-Path src/components/TapeVisualizer.tsx</verify>
  <done>TapeVisualizer component exists and renders the tape and head correctly.</done>
</task>

<task type="auto">
  <name>Strength Analyzer TM and Integration</name>
  <files>src/core/samples-tm.ts, src/App.tsx</files>
  <action>
    - Create `src/core/samples-tm.ts`.
    - Define `strengthTM` which performs a simple length and category check on the password.
    - Update `App.tsx` and `Sidebar.tsx` to include "Turing Machine" in the type selection.
    - Wire the TM hook and tape visualizer into the layout.
  </action>
  <verify>Test-Path src/core/samples-tm.ts</verify>
  <done>Turing Machine can be selected, analyzed, and visualized on the tape.</done>
</task>

## Success Criteria
- [ ] Tape visualizer follows the head movement during simulation.
- [ ] TM correctly marks the password and writes a result on the tape.
