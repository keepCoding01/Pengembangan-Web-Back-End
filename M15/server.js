const path = require('path');
const { createServer } = require('http');
const express = require('express');
const socketio = require('socket.io');
const formatMessage = require('./utils/messages.js').default;
const users = require('./utils/users.js').default;

const { userJoin, getCurrentUser, userLeave, getRoomUsers } = users;

const app = express();
const server = createServer(app);
const io = socketio(server);

app.use(express.static(path.join(__dirname, 'public')));

const botName = "Bot";

io.on("connection", socket => {
    socket.on('joinRoom', ({ username, room }) => {
        const user = userJoin(socket.id, username, room);
        socket.join(user.room);

        socket.emit('message', formatMessage(botName, 'Welcome to RTC!'));
        socket.emit('message', formatMessage(botName, `Welcome to ${user.room}!`));

        socket.broadcast.to(user.room).emit(
            'message',
            formatMessage(botName, `${user.username} has joined the chat`)
        );

        io.to(user.room).emit('roomUsers', {
            room: user.room,
            users: getRoomUsers(user.room)
        });
    });

    socket.on('chatMessage', msg => {
        const user = getCurrentUser(socket.id);
        if (user) {
            io.to(user.room).emit('message', formatMessage(user.username, msg));
        }
    });

    socket.on('disconnect', () => {
        const user = userLeave(socket.id);

        if (user) {
            io.to(user.room).emit(
                'message',
                formatMessage(botName, `${user.username} has left the chat`)
            );

            io.to(user.room).emit('roomUsers', {
                room: user.room,
                users: getRoomUsers(user.room)
            });
        }
    });
});
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
