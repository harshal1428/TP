import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Canvas } from './components/Canvas';
import { useFiniteAutomaton } from './hooks/useFiniteAutomaton';
import { usePushdownAutomaton } from './hooks/usePushdownAutomaton';
import { sampleDFA, sampleNFA } from './core/samples';
import { samplePDA } from './core/samples-pda';
import './App.css';

const App: React.FC = () => {
  const [automatonType, setAutomatonType] = useState<'DFA' | 'NFA' | 'PDA'>('DFA');
  
  const faEngine = useFiniteAutomaton(
    automatonType === 'DFA' ? sampleDFA : (automatonType === 'NFA' ? sampleNFA : null)
  );
  const pdaEngine = usePushdownAutomaton(automatonType === 'PDA' ? samplePDA : null);

  const engine = automatonType === 'PDA' ? pdaEngine : faEngine;
  const automaton = automatonType === 'DFA' ? sampleDFA : (automatonType === 'NFA' ? sampleNFA : samplePDA);

  return (
    <div className="app-container">
      <header className="app-header glass-panel">
        <h1 className="text-gradient">Automata Theory Visualizer</h1>
      </header>
      <main className="app-main">
        <Sidebar 
          automatonType={automatonType}
          setAutomatonType={setAutomatonType}
          engine={engine}
        />
        <Canvas 
          automaton={automaton} 
          activeStates={engine.currentStates}
        />
      </main>
    </div>
  );
};

export default App;
