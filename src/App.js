import logo from './logo.svg';
import { Link } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <Link className="App-link" to="/start">
          Start a Game
        </Link>
        <Link className="App-link" to="/join">
          Join a Game
        </Link>
      </header>
    </div>
  );
}

export default App;
