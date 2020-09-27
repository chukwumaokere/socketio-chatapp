var server = require('socket.io').listen(8084);

server.sockets.on('connection', function (socket) {
	socket.on('message', function (e) {
		console.log(e); 
		//send this message to all sockets
	});
	socket.on('join_room', function(roomId, name) {
		socket.send('socket joining specific room ' + roomId);
		//socket.username = name;
		socket.join(roomId)
		socket.send('socket joined room ' + roomId + ' successfully')
		server.to(roomId).send('a new user has entered the chat room')
		server.to(roomId).emit('user_joined', socket.id, name, roomId, fresh = false);
	});
	socket.on('update_username', function(userName){
		socket.username = userName;
	})
	socket.on('join_random_room', function(user_id, room_type){
		console.log('User is trying to join random room', user_id, room_type);
		getAvailableRoom(room_type).then(roomId => {
			if (roomId !== undefined){
				socket.send('joining random room: ' + roomId);
				//socket.username = user_id;
				socket.join(roomId);
				socket.send('socket joined room ' + roomId + ' successfully')
				server.to(roomId).send('a new user has entered the chat room')
				server.to(roomId).emit('user_joined', socket.id, user_id, roomId, fresh = true);
			}else{
				socket.send('There are no available rooms right now, please wait for a chat supervisor to become available');
			}
			
		});
	});
	socket.on('create_room', function(roomId, userName){
		console.log('Creating chat room', roomId);
		socket.send('Creating chat room ' + roomId);
		socket.send('Joining Chat Room ' + roomId);
		console.log('Joining Chat Room', roomId, socket.id, userName /*socket.handshake.address*/ /*socket.client*/);
		//socket.username = userName;
		socket.join(roomId);
	});
	socket.on('disconnect', function () {
		console.log('disconnected!')
	});
	socket.on('typing', function(status ,user_id){
		let filteredRooms = [];
		let rooms = Object.keys(socket.rooms);
		rooms.forEach(function(room){
			//console.log('running regex on room', room);
			if(room.match(/(^\d+-.+$)|(^\d+$)/)){
				filteredRooms.push(room);
			};
		})
		const room = filteredRooms[0];
		//var room = Object.keys(socket.rooms)[0];
		if(status == true){
			server.to(room).emit('display_typing', true, user_id);
		}else{
			server.to(room).emit('display_typing', false, user_id)
		}
		
	})
	function getRooms(){
		const rooms = server.sockets.adapter.rooms;
		return rooms;
	}
	async function getAvailableRoom(roomtype){
		const rooms = getRooms();
		let availableRooms = [];
		let filteredRooms = [];
		var availableRoom = Object.values(rooms).filter(room => {
			/*
			let sockets = Object.keys(room.sockets);
			sockets.forEach(function(socket){
				console.log('socket? ', server.sockets.sockets[socket].username); // server.sockets.adapter.sockets[socket]
			});
			*/
			//console.log('found room:', room);
			
			//if (room.length < 2){ //ignore count if the name of the user is the same, disregard 2 of the same chat supervisors
				availableRooms.push(Object.keys(rooms).find(key => rooms[key] === room));
				//console.log('available room: ', room);
			//}
		});
		availableRooms.forEach(function(room){
			let regex = new RegExp('((^\\d+)|(^\\d+$))-(' + roomtype + ')'); // /((^\d+)|(^\d+$))-(roomtype)/
			//console.log('running regex on room', room, /*regex*/);
			if(room.match(regex)){ //((^\d+)|(^\d+$))-(Agent Super) //(^\d+-.+$)|(^\d+$)
				console.log('MATCHED ROOM:', room);
				let room_obj = server.sockets.adapter.rooms[room];
				let sockets = Object.keys(room_obj.sockets);
				let people_in_room = [];
				sockets.forEach(function(socket){
					let username = server.sockets.sockets[socket].username;
					people_in_room.push(username);
					//console.log('SOCKET USERNAME? ', username);
				})
				let allEqual = arr => arr.every(v => v === arr[0]);
				if (allEqual(people_in_room)){
					filteredRooms.push(room);
					console.log('THIS ROOM IS AVAILABLE: ', room, people_in_room);
				}else{
					//occupied
					console.log('PEOPLE IN THAT ROOM: ', people_in_room);
				}
				
			};
		})
		console.log('AVAILABLE OPTIONS FOR ROOMS:', filteredRooms);
		const chosenRoom = filteredRooms[0]; // = room with only 1 connected socket; first in line, round robin
		console.log('chose room', chosenRoom);
		return chosenRoom;
	}
	socket.on('leave_room', function(user_id){
		//const rooms = Object.keys(socket.rooms);
		//const roomId = rooms[0];
		let filteredRooms = [];
		let rooms = Object.keys(socket.rooms);
		rooms.forEach(function(room){
			console.log('running regex on room', room);
			if(room.match(/(^\d+-.+$)|(^\d+$)/)){
				filteredRooms.push(room);
			};
		})
		const roomId = filteredRooms[0];
		socket.leave(roomId)
		server.to(roomId).send('a user has left the chat room');
		server.to(roomId).emit('user_left', socket.id, user_id);
		console.log('leave_room', user_id, roomId);
	})
	socket.on('chat_message', function(message, current_user_id){
		//var room = Object.keys(socket.rooms)[0];
		let filteredRooms = [];
		let rooms = Object.keys(socket.rooms);
		rooms.forEach(function(room){
			console.log('running regex on room', room);
			if(room.match(/(^\d+-.+$)|(^\d+$)/)){
				filteredRooms.push(room);
			};
		})
		const room = filteredRooms[0];
		server.to(room).emit('chat_message_received', message, current_user_id);
		console.log('Available rooms are: ',Object.keys(socket.rooms) )
		console.log('message received:', message, current_user_id, room);
	})
	socket.on('kick_user', function(owner_room_id){
		console.log('kicking users', owner_room_id);
		let filteredRooms = [];
		let rooms = Object.keys(socket.rooms);
		rooms.forEach(function(room){
			console.log('running regex on room', room);
			if(room.match(/(^\d+-.+$)|(^\d+$)/)){
				filteredRooms.push(room);
			};
		})
		const room = filteredRooms[0];
		//var room = Object.keys(socket.rooms)[0];
		server.to(room).emit('get_out', owner_room_id);
		//server.to(owner_room_id).emit('get_out', owner_room_id);
		console.log('commencing kick for', owner_room_id, room);
		
	})
	socket.on('destroy_room', function(owner_room_id){
		console.log('destroy', owner_room_id);
		let filteredRooms = [];
		let rooms = Object.keys(socket.rooms);
		rooms.forEach(function(room){
			console.log('running regex on room', room);
			if(room.match(/(^\d+-.+$)|(^\d+$)/)){
				filteredRooms.push(room);
			};
		})
		const room = filteredRooms[0];
		//var room = Object.keys(socket.rooms)[0];
		server.to(room).emit('get_out', owner_room_id);
		
		//const rooms = Object.keys(socket.rooms);
		//const roomId = rooms[0];
		socket.leave(room)
	})
});