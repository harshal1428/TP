import React from 'react';

export const Sidebar: React.FC = () => {
  return (
    <aside className="sidebar glass-panel">
      <h2>Automaton Settings</h2>
      <div className="sidebar-section">
        <h3>Type Selection</h3>
        <select className="ui-select" disabled>
          <option>Deterministic Finite Automaton (DFA)</option>
          <option>Non-deterministic Finite Automaton (NFA)</option>
          <option>Pushdown Automaton (PDA)</option>
          <option>Turing Machine (TM)</option>
        </select>
      </div>
      <div className="sidebar-section">
        <h3>Rules & Transitions</h3>
        <p className="placeholder-text">Rule definitions will appear here.</p>
      </div>
      <div className="sidebar-section">
        <h3>Test Input</h3>
        <input type="text" className="ui-input" placeholder="Enter string..." disabled />
        <button className="btn btn-primary" disabled>Step</button>
      </div>
    </aside>
  );
};
