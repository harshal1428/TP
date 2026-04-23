# Phase 3 Research: PDA Engine Implementation

## Objective
Design the execution engine and visualization for Pushdown Automata (PDA), supporting context-free grammar validations such as balanced brackets, and introduce stack visualization.

## Findings
1. **State Management Hook**: 
   - Finite Automata only need to track a `Set<StateId>`.
   - PDAs (specifically non-deterministic PDAs) must track multiple active *configurations*. A configuration is a pair `(stateId, stackContents)`. 
   - We need a `usePushdownAutomaton` hook. The state will hold `activeConfigurations: { stateId: StateId, stack: string[] }[]`.

2. **Transition Logic (`engine.ts` extensions)**:
   - PDA Transitions require `popSymbol` and `pushSymbol`. 
   - If a transition reads `a`, pops `X`, and pushes `Y, Z`: 
     - It's only valid if current input is `a` (or $\epsilon$) AND the top of the stack is `X` (or $\epsilon$).
     - The new configuration will be `(targetState, newStack)`.
   - Epsilon-closure must now also process epsilon-transitions that modify the stack.
   - Acceptance: By final state OR by empty stack (depending on PDA variant). We will stick to acceptance by Final State for consistency with DFA/NFA, or allow an `acceptBy` flag.

3. **Visualization (`StackVisualizer.tsx`)**:
   - The UI needs a component to display the stack. 
   - If there are multiple active configurations (non-determinism), displaying multiple stacks might be confusing. For simplicity, we can either:
     - Only show the stack of the *first* active configuration.
     - Show a horizontal array of stacks.
     - Enforce Deterministic PDA (DPDA) for educational simplicity, where there is only ever one active configuration at a time. Since most password validation rules that require a stack (like balanced brackets) can be modeled deterministically, a DPDA approach is cleaner for visualization. 

4. **Integration**:
   - The `Automaton` type already has a placeholder for `PDA` and `PDATransition`.
   - The `Sidebar` needs to show the stack contents.

## Decisions
1. **Determinism Preference**: We will build the engine to support NPDA (tracking an array of configurations), but for visualization clarity, if multiple configurations exist, we will display the stack of the most recently updated or the "primary" configuration, or display a tabbed view. Let's start by displaying the stack of `activeConfigurations[0]`.
2. **Hook Separation**: Create `usePushdownAutomaton` rather than overcomplicating `useFiniteAutomaton`.
3. **Sample**: Implement a DPDA for balanced brackets `()` to test the engine.
