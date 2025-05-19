import React from 'react';
import BettingBreakdown from './BettingBreakdown.jsx';

import './App.css'; // Create React App provides this, you can customize or remove it

function App() {
  return (
    <div className="App"> {/* You can keep this outer div or change its class */}
      {/* Remove the default header and content */}
      {/*
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      */}

      {/* Render your BettingBreakdown component */}
      <BettingBreakdown />
    </div>
  );
}

export default App;