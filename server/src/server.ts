import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import path from 'node:path';
const root = process.cwd();
import sequelize from './config/connection.js';
import routes from './routes/index.js';
import {Server} from 'socket.io';
import http from 'http';
const app = express();
const PORT = process.env.PORT || 3001;
// creating http server anmd passing it to socket.io
const server = http.createServer(app);
//intialize socket.io with http server
const io = new Server(server,{
  cors:{
    // client side address.
    origin: `http://localhost:3000`,
    methods: ["GET","POST"]
  }
});
// Serves static files in the entire client's dist folder
app.use(express.static('../client/dist'));
io.on("connection",(socket) => {
  console.log(`User Connected ${socket.id}`);
  socket.on("join_room",(roomId) => {
    socket.join(roomId);
    console.log(`room id is ${roomId}`);
  })
  socket.on("send_message",(data) => {
    console.log("server side sending message to room:",data.roomId);
    console.log(" server side Message data:",data.text);
    socket.to(data.roomId).emit("receive_message",data);
  })
  socket.on("disconnect",() => {
    console.log("user disconnected",socket.id);
  })
})
// Middleware to parse incoming requests
app.use(express.json());
app.use(routes);
// Wild card route to serve the index.html file
app.get('*', (_req, res) => {
    res.sendFile(path.join(root, '../client/dist/index.html'));
});
// * Change force to true to drop tables and recreate them
sequelize.sync({force: false}).then(() => {
  server.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });
});