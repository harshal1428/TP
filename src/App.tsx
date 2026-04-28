import React, { useMemo, useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Canvas } from './components/Canvas';
import { useFiniteAutomaton } from './hooks/useFiniteAutomaton';
import { sampleDFA, sampleNFA, samplePasswordDFA } from './core/samples';
import { completeDFA, minimizeDFA } from './core/dfa-utils';
import './App.css';

const App: React.FC = () => {
  const [automatonType, setAutomatonType] = useState<'DFA' | 'NFA'>('DFA');
  const [isDFAMinimized, setIsDFAMinimized] = useState(false);

  const normalizedDFA = useMemo(() => completeDFA(sampleDFA), []);
  const minimizedDFA = useMemo(() => minimizeDFA(normalizedDFA), [normalizedDFA]);
  const dfaForUse = isDFAMinimized ? minimizedDFA : normalizedDFA;

  const emailDFAEngine = useFiniteAutomaton(
    automatonType === 'DFA' 
      ? dfaForUse
      : automatonType === 'NFA' ? sampleNFA : null
  );
  const passwordDFAEngine = useFiniteAutomaton(
    automatonType === 'DFA' ? samplePasswordDFA : null
  );
  const engine = automatonType === 'DFA' ? emailDFAEngine : emailDFAEngine;
  const automaton = automatonType === 'DFA' ? dfaForUse : sampleNFA;

  return (
    <div className="app-container">
      <header className="app-header glass-panel">
        <div>
          <h1 className="text-gradient">Automata Theory Visualizer</h1>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
            Σ = &#123; local, @, a-z, ., other &#125;
          </div>
        </div>
        <div className="app-header-actions">
          <a
            className="header-link-button"
            href="https://dfa-simulator-opal.vercel.app"
            target="_blank"
            rel="noreferrer"
          >
            DFA Simulator
          </a>
        </div>
      </header>
      <main className="app-main">
        <Sidebar
          automatonType={automatonType}
          setAutomatonType={(type) => {
            setAutomatonType(type);
            if (type !== 'DFA') setIsDFAMinimized(false);
          }}
          isDFAMinimized={isDFAMinimized}
          onToggleDFAMinimize={() => setIsDFAMinimized((prev) => !prev)}
          automaton={automaton}
          engine={engine}
          secondaryEngine={automatonType === 'DFA' ? passwordDFAEngine : undefined}
        />
        <Canvas
          automaton={automaton}
          activeStates={engine.currentStates}
          secondaryAutomaton={automatonType === 'DFA' ? samplePasswordDFA : null}
          secondaryActiveStates={automatonType === 'DFA' ? passwordDFAEngine.currentStates : undefined}
          secondaryTitle={automatonType === 'DFA' ? 'Password DFA (Lower Reference Pane)' : undefined}
          primaryTitle={automatonType === 'DFA' ? 'Email DFA (Upper Interactive Pane)' : undefined}
        />
      </main>
    </div>
  );
};

export default App;
