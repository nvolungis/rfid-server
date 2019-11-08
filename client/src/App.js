import React, { useEffect, useState } from 'react';
import useWebSocket from 'react-use-websocket';
import WistiaEmbed from './WistiaEmbed';
import './App.css';

const idleHashedId = 'c1crb8wbj4';

function App() {
  const socketUrl = 'ws://localhost:4000';
  const [, lastMessage, readyState] = useWebSocket(socketUrl);
  const [cardId, setCardId] = useState();
  const [hashedId, setHashedId] = useState();

  const cardMap = {
    '7316510699229': 'j6gjf7n9nm',
    '2718322021101': 'tbhm1r1jw0',
    '1531831089933': '789q9wju99',
    '11763132142': 'a3q7357e6f',
    '2525410899232': '1kehziqq62',
    '751318413243': '86ak76l1fr',
    '1232242471397': '724frkvl5a',
  }

  useEffect(() => {
    setHashedId(cardMap[cardId] || idleHashedId);
  }, [cardId]);

  useEffect(() => {
    if (lastMessage !== null) {
      setCardId(lastMessage.data);
    }
  }, [ lastMessage, setCardId ]);


  useEffect(() => {
    const timeout = setTimeout(() => {
      setCardId('');
    }, 3500);

    return () => {
      clearTimeout(timeout);
    }
  }, [ lastMessage, setCardId ]);

  return (
    <div className="App">
      {hashedId ? (
        <WistiaEmbed hashedId={hashedId} />
      ) : (
        <div>pick a vid!</div>
      )}
    </div>
  );
}

export default App;
