import React from 'react';
import { Settings, Play, StepForward, Activity } from 'lucide-react';

export const Sidebar: React.FC = () => {
  return (
    <aside className="glass-panel" style={{ width: '320px', display: 'flex', flexDirection: 'column', height: '100%', padding: '1rem', gap: '1.5rem' }}>
      <div>
        <h2 style={{ fontSize: '1.25rem', margin: '0 0 1rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Activity size={20} color="var(--accent-primary)"/> Simulator Controls
        </h2>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <label style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Automaton Type</label>
          <select className="glass-panel" style={{ padding: '0.5rem', color: 'white', outline: 'none' }}>
            <option value="DFA">Deterministic Finite Automaton (DFA)</option>
            <option value="NFA">Non-deterministic Finite Automaton (NFA)</option>
            <option value="PDA">Pushdown Automaton (PDA)</option>
          </select>
        </div>
      </div>

      <div style={{ flex: 1 }}>
        <h3 style={{ fontSize: '1rem', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Rules & Input</h3>
        {/* Placeholder for structured rule inputs */}
        <input 
          type="text" 
          placeholder="Test Password String..." 
          className="glass-panel"
          style={{ width: '100%', padding: '0.75rem', color: 'white', marginBottom: '1rem', outline: 'none' }}
        />
      </div>

      <div style={{ display: 'flex', gap: '0.5rem', flexDirection: 'column' }}>
        <button className="btn" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem' }}>
          <Play size={16} /> Start Simulation
        </button>
        <button className="btn" style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem' }}>
          <StepForward size={16} /> Next Step
        </button>
      </div>
    </aside>
  );
};
