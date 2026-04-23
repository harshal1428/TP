# Phase 4 Research: TM Strength Analyzer Integration

## Objective
Design and implement a Turing Machine (TM) based password strength analyzer. Unlike the previous validators, the TM will perform a multi-pass analysis on the input string to calculate a final score.

## Findings
1. **Core TM Logic**:
   - The TM has a tape (infinite in theory, bounded by input + padding in practice).
   - Transitions: `(state, readSymbol) -> (newState, writeSymbol, moveDirection)`.
   - `moveDirection`: Left (L), Right (R), Stay (S).
   - `tapeAlphabet`: Includes input alphabet plus blank symbol (B) and potential marking symbols (e.g., 'X' for length checked).

2. **Multi-Pass Strength Strategy**:
   - **Pass 1 (Length)**: Move right, counting characters. If end of tape reached, write a marker or transition to a "length-verified" state.
   - **Pass 2 (Diversity)**: Scan for character types (uppercase, numbers). Mark characters as "seen" by changing them or using a separate region of the tape.
   - **Pass 3 (Final Scoring)**: Based on markers, move to the end of the tape and write the final score (e.g., 0-4).

3. **Visualization (`TapeVisualizer.tsx`)**:
   - A horizontal strip representing cells.
   - A visible head (pointer) that highlights the current cell and state.
   - Animation for head movement is critical for the "wow" factor.

4. **Engine Implementation**:
   - `useTuringMachine` hook.
   - State: `tape: string[]`, `head: number`, `status`, `stateId`.

## Decisions
1. **Tape Representation**: Use a fixed-size array with `B` (blank) padding to represent the "infinite" tape.
2. **Strength Sample**: Implement a TM that specifically checks for:
   - Length >= 8.
   - Contains at least one digit.
   - Writes 'S' (Strong), 'M' (Medium), or 'W' (Weak) at the end of the tape.
3. **Hook Separation**: Create `useTuringMachine` to keep the logic clean and decoupled from FA/PDA.
