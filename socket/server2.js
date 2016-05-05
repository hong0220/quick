var express = require('express');
var app = express();
app.get('/', function (req, res) {
    res.status(200).send('欢迎来到汇智网学习！');
});
var server = require('http').createServer(app);
var io = require('socket.io')(server);
io.on('connection', function (socket) {

});
server.listen(8080);