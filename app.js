/*
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const io = require('socket.io')(3100)
const mongoose = require('mongoose')

// body-parser
app.use(bodyParser.json())

// collections
const Users = require('./UserModel')

mongoose.connect('mongodb://localhost:27017/realtimeProject',{useNewUrlParser:true},
    function(err){
        if(err){
            throw err
        }
        console.log('Database connected')
        
        io.on('connection',(socket)=>{
            console.log('user connected')
            socket.on('joinRoom',(data)=>{      // data will look like => {myID: "123123"}
                console.log('user joined room')
                socket.join(data.myID)          
            })
        })
})

Users.watch().on('change',(change)=>{
    console.log('Something has changed')
    io.to(change.fullDocument._id).emit('changes',change.fullDocument)
})
*/

var io = require('socket.io').listen(8084);

io.sockets.on('connection', function (socket) {
	socket.on('message', function (e) {
		console.log(e); 
		//send this message to all sockets
	});
	
	socket.on('disconnect', function () { console.log('disconnected!')});
});