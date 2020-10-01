// import express from 'express';
import WebSocket from 'ws';
import WsHandler from './wsHandler';

// const app = express();
const wss = new WebSocket.Server({ port: 3009 });

const wsHandler = new WsHandler();

wss.on('connection', (ws) => {
  console.log('connected');
  ws.on('message', (msg) => {
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        wsHandler.go(wss, ws, msg);
      }
    });
  });
});

// app.ws('/', (ws, req) => {
//   ws.on('message', (msg) => {
//     wsHandler.go(req, ws, msg);
//   });
// });

// app.listen(3000, () => {
//   console.log('Started, port: 3000');
// });
