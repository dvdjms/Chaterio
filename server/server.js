const express = require('express');
const app = express();
const cors = require('cors');

const serverPort = 9000;

app.use(cors());

const server = require('http').Server(app);

const io = require("socket.io")(server, {
    cors:{
    origin: "*",
    methods: ["GET", "POST"]
    }
});

app.use(express.static('src')) 

io.on("connection", (socket) => {

    socket.on('join-room', (roomId, userId) => {

      socket.join(roomId);
      socket.to(roomId).emit("user-connected", userId);
      console.log('SERVER: connected', userId)

      socket.on("disconnect", () => {
        socket.to(roomId).emit("user-disconnected", userId)
        console.log("SERVER: disconnected", userId)
      });
    });
});

app.get('/', (req, res) => {
  console.log('this', req.headers);
  res.send(`Server is running on port ${serverPort}`)
})

server.listen(serverPort, () => {
  console.log(`App running on port ${serverPort}`);
});
