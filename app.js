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

const { isValidObjectId } = require('mongoose');

var server = require('socket.io').listen(8084);

server.sockets.on('connection', function (socket) {
	socket.on('message', function (e) {
		console.log(e); 
		//send this message to all sockets
	});
	socket.on('join_room', function(roomId) {
		socket.send('socket joining room ' + roomId);
		socket.join(roomId)
		socket.send('socket joined room ' + roomId + ' successfully')
		server.to(roomId).send('a new user has entered the chat room')
	});
	socket.on('join_random_room', function(){
		var roomId = getAvailableRoom();
		socket.send('socket joining room ' + roomId);
		socket.join(roomId)
		socket.send('socket joined room ' + roomId + ' successfully')
		server.to(roomId).send('a new user has entered the chat room')
	});
	socket.on('create_room', function(roomId){
		console.log('Creating chat room', roomId);
		socket.send('Creating chat room ' + roomId);
		socket.send('Joining Chat Room ' + roomId);
		socket.join(roomId);
	});
	socket.on('disconnect', function () {
		console.log('disconnected!')
	});
	function getRooms(){
		const rooms = server.sockets.adapter.rooms;
		return rooms;
	}
	function getAvailableRoom(){
		const rooms = getRooms();
		const availableRoom; // = room with only 1 connected socket;
	}
	socket.on('leave_room', function(){
		const rooms = Object.keys(socket.rooms);
		const roomId = rooms[0];
		socket.leave(roomId)
		server.to(roomId).send('a user has left the chat room');
	})
});