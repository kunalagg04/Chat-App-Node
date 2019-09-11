const express = require('express')
const http = require('http')
const path = require('path')
const socketio = require('socket.io')

const app = express()
const server = http.createServer(app)
const io = socketio(server)

const port = process.env.PORT || 3000
const publicDirectoryPath = path.join(__dirname,'../public')

app.use(express.static(publicDirectoryPath))

// let count = 0

//socket is object and contains info about new connection.
// we communicate by events .
// by emit we are sending an event to client and client will accept it .
//connection is also event

// io.on('connection',(socket) => {    
//     console.log('new connection')

//     socket.emit('countUpdated',count)
//     socket.on('increment' , () => {
//         count++
        
//         // using emit on socket will update value just on the connection which is doing changes thus we use io
//         // socket.emit('countUpdated',count)
//         io.emit('countUpdated',count)
        
//     })
// })

let welcome = 'Welcome to chat app bhosdike'

io.on('connection' , (socket) => {
    socket.emit('welcome' , welcome)

    //broadcast sends it to everybody apart from current
    socket.broadcast.emit('newMessage','A new user has joined')

    socket.on('sendMessage' , (msg , callback) => {
        console.log(msg)
        io.emit('newMessage',msg)
        callback('gaya na bc')
    })

    socket.on('location',(location) => {
        socket.broadcast.emit('rlocation',location)
    })

    //exec func when a user disconnects
    socket.on('disconnect',() => {
        io.emit('newMessage','A user left')
    })
})




server.listen(port , () => {
    console.log(`Server is up on ${port}`)
})
