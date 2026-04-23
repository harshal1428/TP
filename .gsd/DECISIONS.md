# DECISIONS.md

## ADR 001: Separate Evaluation Engine
- **Date**: 2026-04-23
- **Context**: Need to support DFA, NFA, PDA for step-by-step password validation and TM for strength evaluation.
- **Decision**: Do NOT mix engines. DFA/NFA/PDA will be strictly for validation. TM will be for post-validation strength analysis.
- **Status**: Accepted
