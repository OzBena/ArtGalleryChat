const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
  console.log('New client connected');
  
  ws.on('message', (message) => {
    console.log('Received:'+ message.toString('utf8'));
    wss.clients.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message.toString('utf8'));
      }
    });
  });
  ws.on('error', (error) => {
    console.log('WebSocket error:', error);
  });
});

server.listen(8080, () => {
  console.log('Server is listening on port 8080');
});


//testing