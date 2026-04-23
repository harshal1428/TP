import React, { useState } from 'react';
import { AutomatonStatus } from '../hooks/useFiniteAutomaton';
import { StackVisualizer } from './StackVisualizer';
import { TapeVisualizer } from './TapeVisualizer';
import { PDAConfiguration } from '../core/types';

interface SidebarProps {
  automatonType: 'DFA' | 'NFA' | 'PDA' | 'TM';
  setAutomatonType: (type: 'DFA' | 'NFA' | 'PDA' | 'TM') => void;
  engine: {
    input: string;
    pointer?: number;
    status: AutomatonStatus;
    step: () => void;
    reset: (newInput?: string) => void;
    activeConfigs?: PDAConfiguration[];
    tape?: string[];
    head?: number;
  };
}

export const Sidebar: React.FC<SidebarProps> = ({ automatonType, setAutomatonType, engine }) => {
  const [inputValue, setInputValue] = useState(engine.input);

  const handleReset = () => {
    engine.reset(inputValue);
  };

  return (
    <aside className="sidebar glass-panel">
      <h2>Automaton Settings</h2>
      <div className="sidebar-section">
        <h3>Type Selection</h3>
        <select 
          className="ui-select" 
          value={automatonType}
          onChange={(e) => {
            setAutomatonType(e.target.value as 'DFA' | 'NFA' | 'PDA' | 'TM');
            engine.reset(inputValue);
          }}
        >
          <option value="DFA">Deterministic Finite Automaton (DFA)</option>
          <option value="NFA">Non-deterministic Finite Automaton (NFA)</option>
          <option value="PDA">Pushdown Automaton (PDA)</option>
          <option value="TM">Turing Machine (TM)</option>
        </select>
        <p className="placeholder-text">
          {automatonType === 'DFA' && "Accepts strings ending in 'ab'."}
          {automatonType === 'NFA' && "Accepts strings containing 'ab'."}
          {automatonType === 'PDA' && "Validates balanced brackets '()'."}
          {automatonType === 'TM' && "Analyzes password strength (Length + Markers)."}
        </p>

        {engine.activeConfigs && engine.activeConfigs.length > 0 && (
          <StackVisualizer stack={engine.activeConfigs[0].stack} />
        )}
        {automatonType === 'TM' && engine.tape !== undefined && engine.head !== undefined && (
          <TapeVisualizer tape={engine.tape} head={engine.head} />
        )}
      </div>
      
      <div className="sidebar-section" style={{ marginTop: 'auto' }}>
        <h3>Test Input</h3>
        <input 
          type="text" 
          className="ui-input" 
          placeholder="Enter string (e.g. abaab)" 
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        
        <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
          <button className="btn btn-secondary" onClick={handleReset} style={{ flex: 1 }}>Reset</button>
          <button 
            className="btn btn-primary" 
            onClick={engine.step} 
            disabled={engine.status === 'accepted' || engine.status === 'rejected'}
            style={{ flex: 2 }}
          >
            Step
          </button>
        </div>

        {engine.status !== 'idle' && (
          <div style={{ marginTop: '16px', padding: '12px', borderRadius: '8px', background: 'var(--bg-primary)' }}>
            {automatonType !== 'TM' && engine.pointer !== undefined && (
              <div style={{ marginBottom: '8px', fontFamily: 'var(--font-mono)' }}>
                Input: {engine.input.split('').map((char, i) => (
                  <span key={i} style={{ 
                    color: i === engine.pointer ? 'var(--accent-primary)' : (i < engine.pointer ? 'var(--text-muted)' : 'inherit'),
                    fontWeight: i === engine.pointer ? 'bold' : 'normal',
                    textDecoration: i === engine.pointer ? 'underline' : 'none'
                  }}>{char}</span>
                ))}
                {engine.pointer === engine.input.length && <span style={{ color: 'var(--accent-primary)', fontWeight: 'bold' }}>_</span>}
              </div>
            )}
            <div style={{
              fontWeight: 'bold',
              color: engine.status === 'accepted' ? 'var(--success)' : (engine.status === 'rejected' ? 'var(--error)' : 'var(--text-primary)')
            }}>
              Status: {engine.status.toUpperCase()}
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};
