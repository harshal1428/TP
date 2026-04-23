# DECISIONS.md

## ADR 001: Separate Evaluation Engine
- **Date**: 2026-04-23
- **Context**: Need to support DFA, NFA, PDA for step-by-step password validation and TM for strength evaluation.
- **Decision**: Do NOT mix engines. DFA/NFA/PDA will be strictly for validation. TM will be for post-validation strength analysis.
- **Status**: Accepted

## ADR 002: Phase 1 Stack and Architecture
- **Date**: 2026-04-23
- **Context**: Selecting the framework, visualization library, and architecture separation for Phase 1.
- **Decision**: 
  - Framework: React + Vite
  - Visualization: React Flow
  - Architecture: Automata core must be completely decoupled from the UI. Engines (DFA/NFA/PDA/TM) will be treated as pure computational modules.
- **Status**: Accepted
