var express = require('express'),
	app = express(),
	http = require('http').Server(app),
	io = require('socket.io')(http),
	nodeChat = require(__dirname + '/src/nodeChat.js');

app.use(express.static(__dirname + '/public/views'));
app.use(express.static(__dirname + '/public/js'));
app.use(express.static(__dirname + '/bower_components'));

// var nc = new nodeChat(io, http);
// nc.init();
// nc.start();