var rooms = {
    '74': {sockets: { ir5FmK9o8Jzw6A0_AAAD: true, XO7dxkneyt4ziRAKAAAE: true }, length: 2},
    ir5FmK9o8Jzw6A0_AAAD: { sockets: { ir5FmK9o8Jzw6A0_AAAD: true }, length: 1 },
    XO7dxkneyt4ziRAKAAAE: { sockets: { XO7dxkneyt4ziRAKAAAE: true }, length: 1 },
    LDcmwDijBPC_qg6MAAAF: { sockets: { LDcmwDijBPC_qg6MAAAF: true }, length: 2 },
    '99': {sockets: { ir5FmK9o8Jzw6A0_AAAD: true, XO7dxkneyt4ziRAKAAAE: true }, length: 2},
    '33': {sockets: { ir5FmK9o8Jzw6A0_AAAD: true, XO7dxkneyt4ziRAKAAAE: true }, length: 1},
    '66': {sockets: { ir5FmK9o8Jzw6A0_AAAD: true, XO7dxkneyt4ziRAKAAAE: true }, length: 1}

};
let availableRooms = [];
var filteredRooms = [];
var availableRoom = Object.values(rooms).filter(obj => {
    if (obj.length < 2 ){
       availableRooms.push(Object.keys(rooms).find(key => rooms[key] === obj));
    }
});

availableRooms.forEach(function(room){
    if(room.match(/(^\d+$)/)){
        //console.log(room);
        filteredRooms.push(room);
    };
})

const chosenRoom = filteredRooms[0];
console.log(chosenRoom);
