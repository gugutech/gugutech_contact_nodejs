var io = require('../node_modules/socket.io/node_modules/socket.io-client/socket.io');

    var socket_client = io.connect('http://localhost:3000/socket');

    socket_client.on('connect', function() {
        chat.emit('hi!');
    });

// define(function(require, exports, module) {


// });
