import type { Automaton, State, StateId, Symbol, Transition } from './types';

function cloneAutomaton(dfa: Automaton): Automaton {
  return {
    alphabet: new Set(dfa.alphabet),
    states: { ...dfa.states },
    transitions: Object.fromEntries(Object.entries(dfa.transitions).map(([id, t]) => [id, { ...t }])),
    metadata: dfa.metadata ? { ...dfa.metadata } : undefined,
  };
}

function buildTransitionMap(dfa: Automaton): Map<StateId, Map<Symbol, StateId>> {
  const map = new Map<StateId, Map<Symbol, StateId>>();
  for (const stateId of Object.keys(dfa.states)) {
    map.set(stateId, new Map<Symbol, StateId>());
  }

  for (const t of Object.values(dfa.transitions)) {
    if (!map.has(t.source)) map.set(t.source, new Map<Symbol, StateId>());
    if (!map.get(t.source)!.has(t.symbol)) {
      map.get(t.source)!.set(t.symbol, t.target);
    }
  }

  return map;
}

export function completeDFA(dfa: Automaton): Automaton {
  const completed = cloneAutomaton(dfa);
  const alphabet = Array.from(completed.alphabet);
  const transitionMap = buildTransitionMap(completed);

  let needsDead = false;
  for (const stateId of Object.keys(completed.states)) {
    const row = transitionMap.get(stateId) ?? new Map<Symbol, StateId>();
    for (const symbol of alphabet) {
      if (!row.has(symbol)) {
        needsDead = true;
      }
    }
  }

  const deadId = 'dead';
  if (needsDead && !completed.states[deadId]) {
    completed.states[deadId] = {
      id: deadId,
      label: 'DEAD',
      isInitial: false,
      isFinal: false,
      position: { x: 860, y: 340 },
    };
    transitionMap.set(deadId, new Map<Symbol, StateId>());
  }

  let counter = Object.keys(completed.transitions).length + 1;
  const addTransition = (source: string, target: string, symbol: string) => {
    const id = `c${counter++}`;
    completed.transitions[id] = { id, source, target, symbol };
    if (!transitionMap.has(source)) transitionMap.set(source, new Map<Symbol, StateId>());
    transitionMap.get(source)!.set(symbol, target);
  };

  for (const stateId of Object.keys(completed.states)) {
    const row = transitionMap.get(stateId) ?? new Map<Symbol, StateId>();
    for (const symbol of alphabet) {
      if (!row.has(symbol)) {
        addTransition(stateId, needsDead ? deadId : stateId, symbol);
      }
    }
  }

  if (needsDead) {
    const deadRow = transitionMap.get(deadId) ?? new Map<Symbol, StateId>();
    for (const symbol of alphabet) {
      if (!deadRow.has(symbol)) {
        addTransition(deadId, deadId, symbol);
      }
    }
  }

  return completed;
}

function getInitialStateId(dfa: Automaton): StateId | null {
  for (const stateId of Object.keys(dfa.states)) {
    if (dfa.states[stateId].isInitial) return stateId;
  }
  return null;
}

function reachableStates(dfa: Automaton): Set<StateId> {
  const start = getInitialStateId(dfa);
  if (!start) return new Set<StateId>();

  const transitionMap = buildTransitionMap(dfa);
  const seen = new Set<StateId>([start]);
  const queue: StateId[] = [start];

  while (queue.length > 0) {
    const s = queue.shift()!;
    const row = transitionMap.get(s);
    if (!row) continue;
    for (const target of row.values()) {
      if (!seen.has(target)) {
        seen.add(target);
        queue.push(target);
      }
    }
  }

  return seen;
}

export function minimizeDFA(inputDfa: Automaton): Automaton {
  const dfa = completeDFA(inputDfa);
  const alphabet = Array.from(dfa.alphabet);
  const transitions = buildTransitionMap(dfa);
  const reachable = reachableStates(dfa);

  if (reachable.size === 0) {
    return dfa;
  }

  const finals = new Set(Array.from(reachable).filter((s) => dfa.states[s].isFinal));
  const nonFinals = new Set(Array.from(reachable).filter((s) => !dfa.states[s].isFinal));

  let partitions: Array<Set<StateId>> = [];
  if (finals.size > 0) partitions.push(finals);
  if (nonFinals.size > 0) partitions.push(nonFinals);

  let changed = true;
  while (changed) {
    changed = false;
    const newPartitions: Array<Set<StateId>> = [];

    for (const group of partitions) {
      const buckets = new Map<string, Set<StateId>>();

      for (const state of group) {
        const signature = alphabet
          .map((symbol) => {
            const target = transitions.get(state)?.get(symbol) ?? state;
            const index = partitions.findIndex((p) => p.has(target));
            return `${symbol}:${index}`;
          })
          .join('|');

        if (!buckets.has(signature)) buckets.set(signature, new Set<StateId>());
        buckets.get(signature)!.add(state);
      }

      if (buckets.size > 1) changed = true;
      newPartitions.push(...buckets.values());
    }

    partitions = newPartitions;
  }

  const minimizedStates: Record<StateId, State> = {};
  const stateRep = new Map<StateId, StateId>();
  const initial = getInitialStateId(dfa);

  partitions.forEach((group, idx) => {
    const members = Array.from(group);
    const id = `M${idx}`;
    const label = members.join(',');
    const isInitial = initial ? group.has(initial) : false;
    const isFinal = members.some((m) => dfa.states[m].isFinal);

    minimizedStates[id] = {
      id,
      label,
      isInitial,
      isFinal,
      position: { x: 160 + idx * 220, y: 220 },
    };

    for (const m of members) {
      stateRep.set(m, id);
    }
  });

  const minimizedTransitions: Record<string, Transition> = {};
  let tid = 1;
  const seenEdges = new Set<string>();

  for (const group of partitions) {
    const representative = Array.from(group)[0];
    const sourceMin = stateRep.get(representative)!;

    for (const symbol of alphabet) {
      const target = transitions.get(representative)?.get(symbol);
      if (!target) continue;
      const targetMin = stateRep.get(target);
      if (!targetMin) continue;

      const dedupe = `${sourceMin}-${targetMin}-${symbol}`;
      if (seenEdges.has(dedupe)) continue;
      seenEdges.add(dedupe);

      const id = `m${tid++}`;
      minimizedTransitions[id] = {
        id,
        source: sourceMin,
        target: targetMin,
        symbol,
      };
    }
  }

  return {
    alphabet: new Set(dfa.alphabet),
    states: minimizedStates,
    transitions: minimizedTransitions,
    metadata: {
      name: `${dfa.metadata?.name ?? 'DFA'} (Minimized)`,
      description: 'Minimized DFA using partition refinement; unreachable and equivalent states removed.',
      complexity: 'Partition-refinement minimization',
      symbolMode: dfa.metadata?.symbolMode ?? 'raw',
    },
  };
}
