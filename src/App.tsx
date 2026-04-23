import React from 'react';
import { Sidebar } from './components/Sidebar';
import { Canvas } from './components/Canvas';
import './App.css';

const App: React.FC = () => {
  return (
    <div className="app-container">
      <header className="app-header glass-panel">
        <h1 className="text-gradient">Automata Theory Visualizer</h1>
      </header>
      <main className="app-main">
        <Sidebar />
        <Canvas />
      </main>
    </div>
  );
};

export default App;
