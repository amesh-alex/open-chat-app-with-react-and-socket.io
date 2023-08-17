import http from 'http';
import express from 'express';
import WebSocket from './socket/websocket';
import ChatSocket from './socket/chat.socket';

const app = express();

const httpServer = http.createServer(app);

const io = WebSocket.getInstance(httpServer);

io.initializeHandlers([
  { path: '/chat', handler: new ChatSocket() }
])

export default httpServer;