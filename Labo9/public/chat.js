const socket = io.connect();

let username;
document.getElementById('identificationButton').onclick = function() {
    username = document.getElementById('nameInput').value || 'user';
    document.getElementById('identificationBox').style.display = 'none';
    document.getElementById('messagesSection').style.display = 'block';
};

function addMessage(user, messageContent) {
    document.getElementById('chatBox').insertAdjacentHTML('beforeend',
        `<div class="line"><span class="label label-primary">${user}</span> ${messageContent}</div>`)
}

document.getElementById('sendMessageButton').onclick = function() {
    const messageContent = document.getElementById('messageInput').value;
    socket.emit('newMessage', {username, content: messageContent});
    addMessage(username, messageContent);

};

socket.on('getMessages', function (messages)  {
    messages.forEach(m => addMessage(m.username, m.content))
});

socket.on('getMessage', function (message) {
    addMessage(message.username, message.content)

});