import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import GamePage from './pages/GamePage';
import JoinPage from './pages/JoinPage';
import StartPage from './pages/StartPage';

function GamePageWithGameId({ gameId }) {
  return (
    <GamePage gameId={gameId} />
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter> {/* Wrap your Router component with BrowserRouter */}
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/join" element={<JoinPage />} />
      <Route path="/start" element={<StartPage />} />
      <Route path="/hitreplyall/:gameId" element={<GamePageWithGameId />} />
      <Route path="*" element={<main style={{padding: "1rem"}}>
        <p>The page you've searched for doesn't exist!</p>
        </main>
      }/>
    </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
