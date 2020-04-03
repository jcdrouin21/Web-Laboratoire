const express = require('express');
const chatServer = require('./ChatServer.js')
const app = express();

const port = process.env.PORT || 3000;
const http = require('http').Server(app);

const io = require('socket.io')(http);

app.use(express.static('public'));

app.get('/chat', (req, res) => {
    res.sendFile(__dirname + '/index.html')
});

io.on('connection', chatServer.onConnection);

http.listen(port);
console.log(`Listening on port ${port}`);