---
phase: 2
plan: 2
wave: 1
---

# Plan 2.2: Visualization Mapping

## Objective
Implement utility functions that map the pure `Automaton` definitions into React Flow nodes and edges, and create a custom React Flow node component for rendering state circles with "active" highlights.

## Context
- .gsd/SPEC.md
- src/core/types.ts

## Tasks

<task type="auto">
  <name>Custom React Flow Node</name>
  <files>src/components/StateNode.tsx, src/components/StateNode.css</files>
  <action>
    - Create `src/components/StateNode.tsx` and its CSS (using standard CSS variables defined in index.css).
    - Render a circular node. It should accept props `label`, `isInitial`, `isFinal`, and `isActive`.
    - If `isActive` is true, add a strong glow/highlight using `--accent-gradient`.
    - If `isInitial`, draw an incoming arrow or indicator. If `isFinal`, draw a double circle effect.
  </action>
  <verify>Test-Path src/components/StateNode.tsx</verify>
  <done>StateNode component exists and supports active, initial, and final styling states.</done>
</task>

<task type="auto">
  <name>Automaton Mapper</name>
  <files>src/core/mapper.ts</files>
  <action>
    - Create `src/core/mapper.ts`.
    - Implement `automatonToReactFlow(automaton: Automaton, activeStates: Set<StateId>)`.
    - Return an object `{ nodes: Node[], edges: Edge[] }` compatible with React Flow.
    - Nodes should be of type `'stateNode'` and their `data` should include `isActive: activeStates.has(node.id)`.
    - We will need a simple auto-layout algorithm, or just hardcode some positions for now to be laid out nicely. Suggest using `dagre` for auto-layout or simple grid placement. Let's just assign sequential `x, y` for now or require position metadata in the Automaton type. *Decision: add `x, y` to the `State` type in `types.ts` temporarily if needed, or assume fixed positions.* Let's update `State` interface in `types.ts` to include optional `position: { x: number, y: number }`.
  </action>
  <verify>Test-Path src/core/mapper.ts</verify>
  <done>Mapper function correctly translates Automaton and active states into React Flow nodes and edges.</done>
</task>

## Success Criteria
- [ ] StateNode visually distincts active vs inactive states.
- [ ] Mapper dynamically updates node properties based on the activeStates set.
