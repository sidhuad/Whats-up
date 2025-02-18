import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import path from 'node:path';
const root = process.cwd();
import sequelize from './config/connection.js';
import routes from './routes/index.js';
import { Server } from 'socket.io';
import http from 'http';
import Message from '../src/models/Messages.js'; // Import Message model

const app = express();
const PORT = process.env.PORT || 3001;

// Creating HTTP server and passing it to socket.io
const server = http.createServer(app);

// Initialize socket.io with HTTP server
const io = new Server(server, {
  cors: {
    // Client-side address
    origin: `http://localhost:3000`,
    methods: ['GET', 'POST'],
  },
});

// Serves static files in the entire client's dist folder
app.use(express.static('../client/dist'));

io.on('connection', (socket) => {
  console.log(`User Connected: ${socket.id}`);

  // When a user joins a room
  socket.on('join_room', async (roomId) => {
    socket.join(roomId);
    console.log(`User joined room: ${roomId}`);

    try {
      // Fetch previous messages for the chatroom and send to the user
      const previousMessages = await Message.findAll({ where: { roomId } });
      socket.emit('previous_messages', previousMessages);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  });

  // Handling message sending
  socket.on('send_message', async (data) => {
    try {
      // Save the message to the database
      const newMessage = await Message.create({
        sender: data.sender,
        recipientID: data.recipientID,
        roomId: data.roomId,
        text: data.text,
      });

      // Emit the new message to the room
      io.to(data.roomId).emit('receive_message', newMessage);
    } catch (error) {
      console.error('Error saving message:', error);
    }
  });
});

// Middleware to parse incoming requests
app.use(express.json());
app.use(routes);

// Wildcard route to serve the index.html file
app.get('*', (_req, res) => {
  res.sendFile(path.join(root, '../client/dist/index.html'));
});

// Sync database and start server
sequelize.sync({ force: false }).then(() => {
  server.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });
});
