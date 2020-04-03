const messages = [];

exports.onConnection = (socket) => {
    socket.emit('getMessages', messages);
    socket.on('newMessage', (message) => {
        messages.push(message);
        socket.broadcast.emit('getMessage', message)
    })
}