---
phase: 1
plan: 2
wave: 1
---

# Plan 1.2: Core Data Structures & Basic Layout

## Objective
Define the pure, UI-decoupled computational types for the Automata engines and set up the basic React layout shell.

## Context
- .gsd/SPEC.md
- .gsd/DECISIONS.md

## Tasks

<task type="auto">
  <name>Define Core Automata Types</name>
  <files>src/core/types.ts</files>
  <action>
    - Create `src/core/types.ts`.
    - Define interfaces for `State`, `Transition`, and the base structures for `DFA`, `NFA`, `PDA`, and `TM`.
    - Ensure these types are purely computational and completely isolated from any UI/React concerns (no React Flow nodes/edges here).
  </action>
  <verify>Test-Path src/core/types.ts</verify>
  <done>Types are defined without errors and strictly separate logic from UI.</done>
</task>

<task type="auto">
  <name>Implement Basic UI Shell</name>
  <files>src/App.tsx, src/components/Sidebar.tsx, src/components/Canvas.tsx</files>
  <action>
    - Create a modern, dark-themed responsive layout in `src/App.tsx`.
    - Create `Sidebar.tsx` for automaton selection and rule definition placeholders.
    - Create `Canvas.tsx` that initializes an empty React Flow instance (`<ReactFlow>`).
    - Use the CSS variables from `index.css` to give it a glassmorphic, premium feel.
  </action>
  <verify>Test-Path src/components/Sidebar.tsx</verify>
  <done>App.tsx, Sidebar.tsx, and Canvas.tsx are created.</done>
</task>

## Success Criteria
- [ ] `src/core/types.ts` clearly defines decoupled state machines.
- [ ] App loads a responsive sidebar and a React Flow canvas.
