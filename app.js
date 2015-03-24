var express = require('express'),
	app = express(),
	http = require('http').Server(app),
	io = require('socket.io')(http),
	nodePong = require(__dirname + '/src/pongServer.js');


// Add static file directory access for ease of referrence
app.use(express.static(__dirname + '/public/views'));
app.use(express.static(__dirname + '/public/controllers'));
app.use(express.static(__dirname + '/bower_components'));


// Can get configuration from admin page
var ball = {
	'delta_x': 1,
	'delta_y': 1,
	'fps': 15,
	'radius': 20
};

var pongServer = new nodePong(io, http, ball);


// Start server, start listeners
pongServer.initServer();
pongServer.startServer();