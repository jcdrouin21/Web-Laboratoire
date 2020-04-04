const socket = io.connect();

let username;
let users = [];
document.getElementById('identificationButton').onclick = function() {
    username = document.getElementById('nameInput').value || 'user';
    document.getElementById('identificationBox').style.display = 'none';
    document.getElementById('messagesSection').style.display = 'block';
    addUser(username);
};

function addMessage(user, messageContent) {
    if(!(user in users)) {
        users[user] = { user };
        document.getElementById('usersBox').insertAdjacentHTML('beforeend',
            `<div class="line"><span class="label label-primary">${user}</span></div>`);
    }
    document.getElementById('chatBox').insertAdjacentHTML('beforeend',
        `<div class="line"><span class="label label-primary">${user}</span> ${messageContent}</div>`)
}

function addUser(user) {
    if(!(user in users)) {
        users[user] = { user };
        document.getElementById('usersBox').insertAdjacentHTML('beforeend',
            `<div class="line"><span class="label label-primary">${user}</span></div>`);
    }
}

document.getElementById('sendMessageButton').onclick = function() {
    const messageContent = document.getElementById('messageInput').value;
    socket.emit('newMessage', {username, content: messageContent});
    addMessage(username, messageContent);

};

socket.on('getMessages', function (messages)  {
    messages.forEach(m => addMessage(m.username, m.content));
});

socket.on('getMessage', function (message) {
    addMessage(message.username, message.content)

});