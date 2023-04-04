import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Nav from '../components/Nav/Nav';
import { Container, Grid, TextField, Button, Typography, Box, Link } from '@mui/material';
import { styled } from '@emotion/styled';


function useGameNavigation() {
  const navigate = useNavigate();

  function handleEnterGameClick(gameId, nickName) {
    const encodedNickName = encodeURIComponent(nickName);
    console.log(encodedNickName);
    navigate(`/hitreplyall/${gameId}/${encodedNickName}`);
  }

  return { handleEnterGameClick };
}

function StartPage() {
  const [gameId, setGameId] = useState('');
  const [nickName, setNickName] = useState('');
  const [nickNameSent, setNickNameSent] = useState('');
  const { handleEnterGameClick } = useGameNavigation();

  useEffect(() => {
    const newGameId = generateUUID();
    setGameId(newGameId);

    // clean up function to cancel any ongoing requests when component unmounts

  }, []);

  const handleNickNameChange = (event) => {
    setNickName(event.target.value);
  };


  function generateUUID() {
    let dt = new Date().getTime();
    let uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      let r = (dt + Math.random()*16)%16 | 0;
      dt = Math.floor(dt/16);
      return (c === 'x' ? r :(r&0x3|0x8)).toString(16);
    });
    return uuid;
  }

  const handleCopyClick = () => {
    const link = `${gameId}`;
    navigator.clipboard.writeText(link);
    alert(`Link copied to clipboard: ${link}`);
  };

  const handleEnterNickName = (gameId, nickName) => {
    setNickNameSent(true);
    const url = 'http://localhost:3005/start';
    const data = { gameId: gameId, nickName: nickName};
    fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
      .then(response => response.json())
      .then(data => {
        setNickNameSent(true);
        console.log(data);
      })
      .catch(error => console.error(error));
  };

  return (
    <Container>
      <Grid container justifyContent="center" alignItems="center" spacing={3}>
      <Grid item xs={12} md={6}>
        <>
      <Nav />
      <Typography variant="h4" component="h1" gutterBottom>
        Hello Business Professional!
      </Typography>
      {!nickNameSent && (
        <Box>
          <Typography variant="body1" component="p">
            Enter your nickname:
          </Typography>
          <TextField
            value={nickName}
            onChange={handleNickNameChange}
            variant="outlined"
            size="small"
          />
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleEnterNickName(gameId, nickName)}
          >
            Submit
          </Button>
        </Box>
      )}
      {nickNameSent && (
        <Box>
          <Typography variant="body1" component="p">
            {nickName}, your game code is: {`${gameId}`}
          </Typography>
          <Typography variant="body1" component="p">
            Send{' '}
            <Link href="localhost:3000/join" underline="hover">
              the join link
            </Link>{' '}
            to your friends, along with the game code, so they can join in on the fun!
          </Typography>
          <Button variant="outlined" color="primary" onClick={handleCopyClick}>
            Copy Game Code
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleEnterGameClick(gameId, nickName)}
          >
            Enter Game
          </Button>
        </Box>
      )}
      </>
    </Grid>
    </Grid>
    </Container>
  );
}

export default StartPage;



