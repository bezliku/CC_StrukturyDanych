(function () {
    var socket,
        messageListeners = [],
        registerListeners = function () {
            socket.on('connect', function () {
                console.log('Connected!');
            });
            socket.on('ggc-error', function (error) {
                console.error('Błąd!', error);
            });
            socket.on('message', function (message) {
               var i;
               for (i = 0; i < messageListeners.length; i++) {
                   messageListeners[i](message.from, message.what);
               }
            });
        };

    window.communication = {
        connect: function (address) {
            socket = io.connect(address);
            registerListeners();
        },
        sendTo: function (who, what) {
            if (!socket) {
                console.error('Błąd!', 'Połącz się!');
            }
            socket.emit('sendTo', {'who': who, 'what': what});
        },
        register: function (name) {
            if (!socket) {
                console.error('Błąd!', 'Połącz się!');
            }
            socket.emit('register', name);
        },
        addMessageListener: function (listener) {
            messageListeners.push(listener);
        }
    };
})();
