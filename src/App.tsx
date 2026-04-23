import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Canvas } from './components/Canvas';
import { useFiniteAutomaton } from './hooks/useFiniteAutomaton';
import { usePushdownAutomaton } from './hooks/usePushdownAutomaton';
import { useTuringMachine } from './hooks/useTuringMachine';
import { sampleDFA, sampleNFA } from './core/samples';
import { samplePDA } from './core/samples-pda';
import { strengthTM } from './core/samples-tm';
import './App.css';

const App: React.FC = () => {
  const [automatonType, setAutomatonType] = useState<'DFA' | 'NFA' | 'PDA' | 'TM'>('DFA');
  
  const faEngine = useFiniteAutomaton(
    automatonType === 'DFA' ? sampleDFA : (automatonType === 'NFA' ? sampleNFA : null)
  );
  const pdaEngine = usePushdownAutomaton(automatonType === 'PDA' ? samplePDA : null);
  const tmEngine = useTuringMachine(automatonType === 'TM' ? strengthTM : null);

  const getEngine = () => {
    switch (automatonType) {
      case 'PDA': return pdaEngine;
      case 'TM': return tmEngine;
      default: return faEngine;
    }
  };

  const getAutomaton = () => {
    switch (automatonType) {
      case 'DFA': return sampleDFA;
      case 'NFA': return sampleNFA;
      case 'PDA': return samplePDA;
      case 'TM': return strengthTM;
    }
  };

  const engine = getEngine();
  const automaton = getAutomaton();

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
