import {WebSocketServer} from 'ws';  // Importing WebSocket from 'ws'

const clients = {};

export const initWebSocketServer = (server) => {
  const wss = new WebSocketServer({ port:8080 });

  wss.on("connection", (ws) => {
    ws.on("message", (message) => {
      const { pollId } = JSON.parse(message);
      clients[pollId] = clients[pollId] || [];
      clients[pollId].push(ws);
    });
  });
};

export const broadcastUpdate = (pollId, data) => {
  if (clients[pollId]) {
    clients[pollId].forEach((ws) => ws.send(JSON.stringify(data)));
  }
};
