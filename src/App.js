import React from 'react';
import logo from './trivia.png';
import './App.css';
import Content from './routers/Content';

// Começa o projeto Trivia
export default function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={ logo } className="App-logo" alt="logo" />
        <p>SUA VEZ</p>
      </header>
      <Content />
    </div>
  );
}
