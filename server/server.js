// // create express server
// const express = require('express')
// // app variable runs the express function
// const app = express()
// // This allows us to create a server with socket.io
// const server = require('http').Server(app)
// // create server based on express server and passes it to socket.io
// // socket know which server we're using.
// const io = require('socket.io')(server)
// // creates unique ids for each new page
// const { v4: uuidV4 } = require('uuid')

// //set up server for view engine. Set up how we're going to render views. In this case we're import ejs ().
// app.set('view engine', 'js')
// // set up static folder - all javaScript and css will go here
// app.use(express.static('public'))
// // for the url route 
// app.get('/', (req, res) => {
//     res.redirect(`/${uuidV4()}`)
// })
// // no home page so homepage create brand new room. New room here...
// // app.get('/:room', (req, res) => {
// //     res.render('room', { roomId: req.params.room })
// // })
// // console.log('room', roomId)

// // will run anytime someone lands on webpage.
// // whenever we join a room we're going to pass in the roomId and userId
// io.on('connection', socket => {
//     socket.on('join-room', (roomId, userId) => {
//         console.log(roomId, userId)
//         // connects room with new user
//         socket.join(roomId)
//         socket.to(roomId).emit('user-connected', userId)

//         socket.on('disconnect', () => {
//             socket.to(roomId).emit('user-disconnected',
//             userId)
//         })
//     })
// })





const express = require('express');
// const http = require("http");
const app = express();

const server = require('http').Server(app);
// const server = http.createServer(app);
const io = require("socket.io")(server, {
    cors:{
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
    }
});
const cors = require("cors");
app.use(cors());
app.use(express.static('src')) 
const { v4: uuidV4 } = require('uuid')

app.get('/', (req, res) => {
  res.redirect(`/${uuidV4()}`)
})

// no home page so homepage create brand new room. New room here...
app.get('/:room', (req, res) => {
    res.render('room', { roomId: req.params.room })
})


io.on("connection", socket => {

     socket.on('join-room', (roomId, userId) => {

      console.log("SERVER", roomId, userId)

      socket.join(roomId)
      socket.to(roomId).emit("user-connected", userId)
      
      socket.on("disconnect", () => {
        console.log("SERVER: disconnected David")
        socket.to(roomId).emit("user-disconnected", userId)
      });
    });
});



server.listen(9000, () => {
  console.log('App running on port 9000');
});






















// const express = require('express');
// const http = require("http")
// const app = express();
// const server = http.createServer(app)
// const io = require("socket.io")(server, {
//     cors:{
//     origin: "http://localhost:3000",
//     methods: ["GET", "POST"]
//     }
// })
// const cors = require("cors");
// app.use(cors());


// const { v4: uuidV4 } = require('uuid')
// // set up static folder - all javaScript and css will go here
// app.use(express.static('public'));
// // for the url route 
// app.get('/videocall', (req, res) => {
//   const id = uuidV4();
//   res.send({ id });
// });
// // no home page so homepage create brand new room. New room here...
// // app.get('/:room', (req, res) => {
// //     res.render('room', { roomId: req.params.room })
// // })

// // whenever we join a room we're going to pass in the roomId and userId

// io.on('connection', socket => {
//     socket.on('join-room', (roomId, userId) => {
//         console.log(roomId, userId)
//         // connects room with new user
//         socket.join(roomId)
//         socket.broadcast.to(roomId).emit('user-connected', {userId})

//         socket.on('disconnect', () => {
//             socket.broadcast.to(roomId).emit('user-disconnected',
//             {userId})
//         });
//     });
// });

// server.listen(9000, () => console.log("Server running on port 9000"));



