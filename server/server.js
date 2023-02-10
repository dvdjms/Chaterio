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
// app.get('/:room', (req, res) => {
//     res.render('room', { roomId: req.params.room })
// })

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
const app = express(); // NEW

const http = require("http")
const Server = require("socket.io").Server


const server = http.createServer()
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
})

server.listen(9000, () => {
  console.log('App running on port 9000 yo');
});






// , {
// 	cors: {
// 		origin: "http://localhost:3000",
// 		methods: [ "GET", "POST" ]
// 	}
// })
// app.get('/', (req, res) => {
//   res.send('Hello World from David!');
// });


// app.get('/:room', (req, res) => {
//     res.render('room', { roomId: req.params.room })
// })

io.on("connection", (socket) => {
  socket.emit("me", socket.id)
  console.log(`socket..... ${socket.id}`) // test


  socket.on("disconnect", () => {
    console.log("disconnected")
    socket.broadcast.emit("callEnded")
  })

  socket.on("callUser", (data) => {
    console.log("callUser", data)
    io.to(data.userToCall).emit("callUser", {
      signal: data.signalData,
      from: data.from,
      name: data.name
    })
  })

  socket.on("answerCall", (data) => {
    console.log("answerCall", data)
    io.to(data.to).emit("callAccepted"), data.signal
  })
})





