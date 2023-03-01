import React, { useState } from 'react';

function JoinPage() {
  const [gameId, setGameId] = useState('');
  const [nickName, setNickName] = useState('');
  const [responseMessage, setResponseMessage] = useState('');

  const handleGameIdChange = (event) => {
    setGameId(event.target.value);
  };

  const handleNickNameChange = (event) => {
    setNickName(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const url = 'http://localhost:3005/join';
    const data = { gameId, nickName };

    fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        setResponseMessage(data.message);
      })
      .catch((error) => console.error(error));
  };

  return (
    <div>
      <h1>Hello Business Professional!</h1>
      <p>Join a game by entering details below!</p>
      <form onSubmit={handleSubmit}>
        <label>
          Game Code:
          <input type="text" value={gameId} onChange={handleGameIdChange} />
        </label>
        <br />
        <label>
          NickName:
          <input type="text" value={nickName} onChange={handleNickNameChange} />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
      <p>{responseMessage}</p>
    </div>
  );
}

export default JoinPage;
