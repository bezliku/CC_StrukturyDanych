var io = require('socket.io').listen(3101),
    clients = {};

io.sockets.on('connection', function (socket) {
    socket.on('register', function (name) {
        var oldName;
        for (oldName in clients) {
            if (clients[oldName] === socket) {
                socket.emit('ggc-error', 'Jesteś już zarejestrowany jako ' + oldName);
                return;
            }
        }
        if (!clients[name]) {
            clients[name] = socket;
        } else {
            socket.emit('ggc-error', 'Ktoś już jest zarejestrowany pod takim imieniem');
        }
        console.log(Object.keys(clients));
    });
    socket.on('sendTo', function (payload) {
        console.log(payload);
        var name = payload.who,
            what = payload.what;
        if (!clients[name]) {
            socket.emit('ggc-error', 'Nie ma kogoś takiego jak ' + name + '!');
        } else {
            clients[name].emit('message', {from: name, what: what});
        }
    });
    socket.on('disconnect', function () {
        var name;
        for (name in clients) {
            if (clients[name] === socket) {
                delete clients[name];
            }
        }
    });
});

