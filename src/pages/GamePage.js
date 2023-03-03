import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
//NEED TO FIX THE FETCH REQUESTS SO ONLY ONE IS MADE PER INIT

function GamePage() {
  const location = useLocation();
  const [nickNames, setNickNames] = useState([]);

  useEffect(() => {
    // Make GET request to API
    fetch(`http://localhost:3005${location.pathname}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(`Retrieving nickNames for game ID ${location.pathname}`);
        console.log(`Nicknames: ${JSON.stringify(data.nickNames)}`);
        setNickNames(data.nickNames);
      })
      .catch((error) => console.error(error));
  }, [location.pathname]);

  return (
    <div>
      <h1>Welcome to the game!</h1>
      <p>Nicknames: {JSON.stringify(nickNames)}</p>
    </div>
  );
}

export default GamePage;
