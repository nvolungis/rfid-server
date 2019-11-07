import React, { useEffect, useState } from 'react';
import useWebSocket from 'react-use-websocket';
import './App.css';

function App() {
  const socketUrl = 'ws://localhost:4000';
  const [, lastMessage, readyState] = useWebSocket(socketUrl);
  const [cardId, setCardId] = useState();

  useEffect(() => {
    if (lastMessage !== null) {
      setCardId(lastMessage.data);
    }
  }, [ lastMessage, setCardId ]);

  return (
    <div className="App">
      <h1>what up</h1>
      {cardId && <span>cardId: {cardId}</span>}
    </div>
  );
}

export default App;
