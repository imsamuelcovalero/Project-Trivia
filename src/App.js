import React, { Component } from 'react';
import logo from './trivia.png';
import './App.css';
import Content from './routers/Content';

// Começa o projeto Trivia
class App extends Component {
  render() {
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
}

export default App;
