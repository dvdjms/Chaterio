
// const express = require('express');
// const app = express();

// // const server = require('https').Server(app);


// const https = require('https')
// const fs = require('fs')
// const options = {
//   key: fs.readFileSync('./certs/key.pem'),
//   cert: fs.readFileSync('./certs/cert.pem'),
// };

// // key: fs.readFileSync('./certs/davids-macbook-pro.tail2cc5f.ts.net.key'),
// // cert: fs.readFileSync('./certs/davids-macbook-pro.tail2cc5f.ts.net.crt'),

// const server = https.createServer(options, app);
// const io = require("socket.io")(server, {
//     cors:{
//     origin: "*",
//     methods: ["GET", "POST"]
//     }
// });

// const cors = require("cors");
// app.use(cors());
// app.use(express.static('src')) 


// io.on("connection", (socket) => {

//     socket.on('join-room', (roomId, userId) => {
//       console.log("SERVER:", roomId, userId);

//       socket.join(roomId);
//       socket.to(roomId).emit("user-connected", userId);
//       console.log('SERVER: user connected', userId)

//       socket.on("disconnect", () => {
//         socket.to(roomId).emit("user-disconnected", userId)
//         console.log("SERVER: disconnected")
//       });
//     });
// });


// app.get('/', (req, res) => {
//   res.send("Server is running on port 443")
// })


// server.listen(443, () => {
//   console.log('App running on port 443');
// });





const express = require('express');
const app = express();

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
  res.send("Server is running on port 9000")
})

server.listen(9000, () => {
  console.log('App running on port 9000');
});
