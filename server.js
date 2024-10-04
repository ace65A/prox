const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const dotenv = require('dotenv');
const { handleCommand } = require('./src/commandHandler');

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Serve static files
app.use(express.static(__dirname + '/public'));

io.on('connection', (socket) => {
    console.log('New user connected');

    // Listen for user messages
    socket.on('userMessage', (message) => {
        console.log('User Message: ', message);
        handleCommand(message.toLowerCase(), socket);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
