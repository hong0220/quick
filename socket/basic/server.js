var io = require('socket.io');
var io = require('socket.io')(80);

io.on('connection', function (socket) {
    //连接成功...
    socket.on('disconnect', function () {
        //用户已经离开...
    });
});