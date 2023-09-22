import express from 'express';
import http from 'http';
import { Server as SocketServer } from 'socket.io';

const app = express();
const server = http.createServer(app);
const io = new SocketServer(server);

const PORT = process.env.PORT || 3000; // Use the PORT environment variable if available, or default to 3000

io.on('connection', (socket) => {
  console.log('Client connected');

  socket.on('message', (body) => {
    socket.broadcast.emit('message', {
      //store message in database

      //send message to all clients
      body,
      from: 'other person',
    });
  });
});

server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
