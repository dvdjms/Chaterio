const express = require('express');
const app = express();
const serverPort = 9000;

const server = require('http').Server(app);

const io = require("socket.io")(server, {
    cors:{
    origin: "*",
    methods: ["GET", "POST"]
    }
});

const cors = require("cors");
app.use(cors());
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
  res.send(`Server is running on port ${serverPort}`)
})

server.listen(serverPort, () => {
  console.log(`App running on port ${serverPort}`);
});
