import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Nav from '../components/Nav/Nav';
import { Card, CardContent, Typography, Grid } from '@material-ui/core';
import './GamePage.css';

function GamePage() {
  const location = useLocation();
  const [nickNames, setNickNames] = useState([]);
  const [dealtCards, setDealtCards] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8082');

    ws.onopen = () => {
      console.log('WebSocket connection established');

      // Make GET request to API
      fetch(`http://localhost:3005${location.pathname}/initaldeal`)
        .then((response) => response.json())
        .then((data) => {
          console.log(`Retrieving nickNames for game ID ${location.pathname}`);
          console.log(`Nicknames: ${JSON.stringify(data.nickNames)}`);
          setNickNames(data.nickNames);
          setDealtCards(data.cardsToSend);
          setLoading(false);
        })
        .catch((error) => console.error(error));
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log('Received WebSocket message:', event.data);
      setNickNames(data.nickNames);
    };

    return () => {
      ws.close();
    };
  }, [location.pathname]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Nav />
      <div>
        <h1>Welcome to the game!</h1>
        <p>Nicknames: {nickNames.map(nickname => nickname.nickName).join(', ')}</p>
        <Grid container spacing={2} justify="center">
          <Grid className="HandContainer" container item spacing={2} xs={12} md={9} lg={7} justify="center">
            {dealtCards.map((card) => (
              <Grid item xs={12} sm={6} md={2} key={card.RelationalID}>
                <Card className="Card Hand">
                  <CardContent>
                    <Typography variant="h5" component="h2">
                      {card.CardType}
                    </Typography>
                    <Typography color="textSecondary">
                      {card.Text}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </div>
    </>
  );
  
  
}

export default GamePage;
