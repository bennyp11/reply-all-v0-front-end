import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function GamePage() {
  const location = useLocation();
  const [nickNames, setNickNames] = useState([]);
  const [dealtCards, setDealtCards] = useState([]);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8082');

    ws.onopen = () => {
      console.log('WebSocket connection established');
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log('Received WebSocket message:', event.data);
      setNickNames(data.nickNames);
    };

    // Make GET request to API
    fetch(`http://localhost:3005${location.pathname}/initaldeal`)
      .then((response) => response.json())
      .then((data) => {
        console.log(`Retrieving nickNames for game ID ${location.pathname}`);
        console.log(`Nicknames: ${JSON.stringify(data.nickNames)}`);
        data.dealtCards.forEach(item => {
          console.log(item);
        });
        setNickNames(data.nickNames);
      })
      .catch((error) => console.error(error));

    return () => {
      ws.close();
    };
  }, [location.pathname]);

  return (
    <div>
      <h1>Welcome to the game!</h1>
      <p>Nicknames: {JSON.stringify(nickNames)}</p>
      <p>Cards: {JSON.stringify()}</p>
    </div>
  );
}

export default GamePage;
