import React from 'react';
import logo from './logo.svg';
import { Link } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import './App.css';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Select an option to play Reply All!
          </p>
          <Link className="App-link" to="/start">
            Start a Game
          </Link>
          <Link className="App-link" to="/join">
            Join a Game
          </Link>
        </header>
      </div>
    </ThemeProvider>
  );
}

export default App;

