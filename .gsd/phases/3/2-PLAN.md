---
phase: 3
plan: 2
wave: 2
---

# Plan 3.2: Visualization and Integration

## Objective
Create the stack visualization UI component, define a sample balanced-bracket PDA, and integrate it into the main app shell.

## Context
- src/App.tsx
- src/components/Sidebar.tsx
- src/hooks/usePushdownAutomaton.ts

## Tasks

<task type="auto">
  <name>Stack Visualizer Component</name>
  <files>src/components/StackVisualizer.tsx, src/components/Sidebar.tsx</files>
  <action>
    - Create `src/components/StackVisualizer.tsx`.
    - Render an array of strings as a vertical stack of blocks using premium CSS styles (glassmorphism, clean borders).
    - In `Sidebar.tsx`, if the active engine provides `activeConfigs`, render the `StackVisualizer` using the stack from `activeConfigs[0]`.
  </action>
  <verify>Test-Path src/components/StackVisualizer.tsx</verify>
  <done>StackVisualizer component exists and renders an array properly.</done>
</task>

<task type="auto">
  <name>Sample PDA and Integration</name>
  <files>src/core/samples-pda.ts, src/App.tsx</files>
  <action>
    - Create `src/core/samples-pda.ts`.
    - Define `samplePDA` for balanced brackets `()` using `PDA` and `PDATransition` types.
    - Update `App.tsx` and `Sidebar.tsx` to include "PDA" in the type selection dropdown.
    - When "PDA" is selected, instantiate `usePushdownAutomaton` instead of `useFiniteAutomaton`.
    - Ensure `Canvas` mapper still works using the `currentStates` derived from the PDA hook.
  </action>
  <verify>Test-Path src/core/samples-pda.ts</verify>
  <done>PDA can be selected and stepped through, with stack visualization updating correctly.</done>
</task>

## Success Criteria
- [ ] Stack visualizer dynamically grows and shrinks based on push/pop.
- [ ] The DPDA correctly accepts `(())` and rejects `(()`.
