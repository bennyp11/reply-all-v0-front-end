import React from 'react';
import { useLocation } from 'react-router-dom';

function GamePage() {
  const location = useLocation();
  console.log(location.pathname);

  return (
    <div>
      <h1>Welcome to the game!</h1>
      <p></p>
    </div>
  );
}

export default GamePage;
