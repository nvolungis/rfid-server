const path = require('path');
const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const port = 4000;

let websockets = [];

wss.on('connection', (ws) => websockets.push(ws));

app.use(express.static(path.join(__dirname, '../', 'client', 'build')));

app.get('/', (req, res) => res.sendFile(path.join(__dirname, '../', 'client', 'build', 'index.html')));
app.get('/card', (req, res) => {
  const cardId = req.query["card"];
  websockets.forEach(ws => ws.send(cardId));
  res.send('ok');
});


server.listen(port, () => console.log(`Example app listening on port ${port}!`))
