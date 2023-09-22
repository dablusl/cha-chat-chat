import express from 'express';
import http from 'http';
import { Server as SocketServer } from 'socket.io';

const app = express();
const server = http.createServer(app);
const io = new SocketServer(server);

io.on('connection', (socket) => {
  console.log('Client connected');

  socket.on('message', (body) => {
    socket.broadcast.emit('message', {
      //store message in database

      //send message to all clients
      body,
      from: 'other person',
    })
  });
});
 
server.listen(PORT);

console.log('listening on port', PORT);
