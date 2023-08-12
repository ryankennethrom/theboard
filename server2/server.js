const express = require('express')
const path = require('path')
const app = express()
app.use(express.static(path.join(__dirname + '/public')))

const PORT = process.env.PORT || 3000

let server = app.listen(PORT);

const io = require('socket.io')(server);
var savedData;
io.on('connection', (socket)=>{
    console.log('A user connected');

    socket.on('canvas-data', (data) => {
        savedData=data
        socket.broadcast.emit('canvas-data', data);

        console.log("canvas-data saved and emitted");
    });

    socket.on('saved-canvas-data', (data)=>{
        io.to(socket.id).emit("saved-canvas-data", savedData);
    });
})