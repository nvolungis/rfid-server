import React, { useEffect, useState } from 'react';
import useWebSocket from 'react-use-websocket';
import WistiaEmbed from './WistiaEmbed';
import './App.css';

function App() {
  const socketUrl = 'ws://10.0.0.34:4000';
  const [, lastMessage, readyState] = useWebSocket(socketUrl);
  const [cardId, setCardId] = useState();
  const [hashedId, setHashedId] = useState();

  const cardMap = {
    '701991537684': 'a3q7357e6f',
    '7316510699229': 'j6gjf7n9nm',
    '2718322021101': 'tbhm1r1jw0',
    '1531831089933': '789q9wju99',
    '419125099235': '86ak76l1fr',
  }

  useEffect(() => {
    setHashedId(cardMap[cardId]);
  }, [cardId]);

  useEffect(() => {
    if (lastMessage !== null) {
      setCardId(lastMessage.data);
    }
  }, [ lastMessage, setCardId ]);

  return (
    <div className="App">
      <h1>what up</h1>
      <button onClick={() => setHashedId('a3q7357e6f')}>
        change
      </button>
      {cardId && <span>cardId: {cardId}</span>}
      {hashedId ? (
        <WistiaEmbed hashedId={hashedId} />
      ) : (
        <div>pick a vid!</div>
      )}
    </div>
  );
}

export default App;
