import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Canvas } from './components/Canvas';
import { useFiniteAutomaton } from './hooks/useFiniteAutomaton';
import { sampleDFA, sampleNFA } from './core/samples';
import './App.css';

const App: React.FC = () => {
  const [automatonType, setAutomatonType] = useState<'DFA' | 'NFA'>('DFA');
  const automaton = automatonType === 'DFA' ? sampleDFA : sampleNFA;
  
  const engine = useFiniteAutomaton(automaton);

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
