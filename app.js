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
		getAvailableRoom().then(roomId => {
			if (roomId !== undefined){
				socket.send('joining random room: ' + roomId);
				socket.join(roomId);
				socket.send('socket joined room ' + roomId + ' successfully')
				server.to(roomId).send('a new user has entered the chat room')
			}else{
				socket.send('There are no available rooms right now, please wait for a chat supervisor to become available');
			}
			
		});
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
	async function getAvailableRoom(){
		const rooms = getRooms();
		let availableRooms = [];
		let filteredRooms = [];
		var availableRoom = Object.values(rooms).filter(obj => {
			if (obj.length < 2){
				availableRooms.push(Object.keys(rooms).find(key => rooms[key] === obj));
			}
		});
		availableRooms.forEach(function(room){
			if(room.match(/(^\d+$)/)){
				filteredRooms.push(room);
			};
		})
		const chosenRoom = filteredRooms[0]; // = room with only 1 connected socket; first in line, round robin

		return chosenRoom;
	}
	socket.on('leave_room', function(){
		const rooms = Object.keys(socket.rooms);
		const roomId = rooms[0];
		socket.leave(roomId)
		server.to(roomId).send('a user has left the chat room');
	})
	socket.on('chat_message', function(message){
		console.log('message received:', message);
		var room = Object.keys(socket.rooms)[0];
		server.to(room).emit('chat_message_received', message);
		//.send(message);
		//.emit('')
	})
});