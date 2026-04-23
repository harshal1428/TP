# SPEC.md — Project Specification

> **Status**: `FINALIZED`

## Vision
An interactive, educational simulator that visualizes how Automata (DFA, NFA, PDA) and Turing Machines process password validation rules and evaluate password strength step-by-step.

## Goals
1. Provide an intuitive UI for users to select an automaton type (DFA, NFA, PDA) and define structured password rules.
2. Implement robust execution engines for DFA, NFA, and PDA with step-by-step state and stack transitions.
3. Visualize the execution trace dynamically, updating states, stack contents, and input pointers per step.
4. Integrate a separate Turing Machine (TM) strength engine to evaluate password strength (score, issues) post-validation.

## Non-Goals (Out of Scope)
- Mixing validation engines (DFA/NFA/PDA) with the strength evaluation engine (TM) during the primary step execution.
- Processing the entire input string in a single bound without step-by-step granularity.
- Handling natural language rule definition (structured inputs only).

## Users
- Students and educators learning Automata Theory.
- Developers visualizing regular expressions, context-free grammars, and Turing machine concepts applied to password validation.

## Constraints
- The UI must strictly isolate execution to a single transition per "Next Step".
- The system must explicitly handle edge cases: end of input, dead states, empty stack for PDA, and multiple active states for NFA.
- The Turing Machine runs as a completely separate post-validation phase or explicitly via an "Analyze Strength" action.

## Success Criteria
- [ ] Users can successfully build an automaton using structured rules and input a string.
- [ ] The simulation correctly highlights current states, edges, and stack contents step-by-step.
- [ ] The engine correctly evaluates to ACCEPT or REJECT based on strict theoretical models.
- [ ] The TM module accurately scores accepted passwords in a multi-pass approach, presenting clear reasons for its score.
