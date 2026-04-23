---
phase: 1
plan: 1
wave: 1
---

# Plan 1.1: Project Setup & Dependencies

## Objective
Initialize the React + Vite project and install the necessary dependencies like React Flow to support our decoupled architecture.

## Context
- .gsd/SPEC.md
- .gsd/DECISIONS.md

## Tasks

<task type="auto">
  <name>Initialize React + Vite</name>
  <files>package.json, vite.config.ts</files>
  <action>
    - Run `npm create vite@latest . -- --template react-ts` (we will use another empty folder or force it to initialize the app setup in this directory). Actually, Vite might complain about non-empty directory. In PowerShell, we can just `npm create vite@latest frontend -- --template react-ts` or something similar. Wait, the system says we must initialize in the current directory with `./`, so we might need to handle the non-empty case by creating a temporary dir and moving files, or manually bringing in the `package.json`. Let's just assume `npm create vite@latest . -- --template react-ts` or similar will be handled in execution.
    - Run `npm install`
    - Run `npm install @xyflow/react lucide-react`
  </action>
  <verify>Test-Path package.json</verify>
  <done>package.json exists with react and @xyflow/react dependencies installed.</done>
</task>

<task type="auto">
  <name>Setup Vanilla CSS Infrastructure</name>
  <files>src/index.css</files>
  <action>
    - Clear `src/App.css`.
    - Update `src/index.css` to define a modern, rich aesthetic CSS variable system (dark mode colors, smooth gradients, glassmorphism utilities) based on the guidelines.
    - Avoid Tailwind, ensure standard CSS is used for premium UI tokens.
  </action>
  <verify>Test-Path src/index.css</verify>
  <done>index.css contains comprehensive CSS variables and styling tokens for the UI.</done>
</task>

## Success Criteria
- [ ] Vite React project is initialized and builds successfully.
- [ ] React Flow is installed.
- [ ] CSS token system is established for premium UI development.
