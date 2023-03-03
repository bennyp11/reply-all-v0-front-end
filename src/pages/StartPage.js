import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

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
    const link = `www.localhost:3000/hitreplyall/${gameId}`;
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
    <div>
      <h1>Hello Business Professional!</h1>
      {!nickNameSent && (
        <div>
        <p>Enter your nickname: 
        <input type="text" value={nickName} onChange={handleNickNameChange} />
        <button onClick={()=>handleEnterNickName(gameId, nickName)}>Submit</button>
      </p>
        </div>
      )}
        {nickNameSent && (
          <div>
          <p>{nickName}, your game code is: {`${gameId}`}</p>
          <button onClick={handleCopyClick}>Copy Game Code</button>
          <button onClick={() => handleEnterGameClick(gameId, nickName)}>Enter Game</button>
          </div>
        )}
    </div>
  );
}

export default StartPage;



