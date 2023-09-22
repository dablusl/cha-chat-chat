import express from 'express';
import http from 'http';
import { Server as SocketServer } from 'socket.io';
import cors from 'cors'; // Import the CORS middleware

const app = express();
const server = http.createServer(app);
const io = new SocketServer(server);

const PORT = process.env.PORT || 3000;

// Apply CORS middleware to allow all origins (not recommended for production)
app.use(cors());

console.log('Starting server...');

io.on('connection', (socket) => {
  console.log('Client connected');

  socket.on('message', (body) => {
    console.log('Received message:', body);
    socket.broadcast.emit('message', {
      body,
      from: 'other person',
    });
  });
});

server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
