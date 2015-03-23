var express = require('express'),
	app = express(),
	http = require('http').Server(app),
	io = require('socket.io')(http),
	nodePong = require(__dirname + '/src/pongServer.js');


// Add static file directory access for ease of referrence
app.use(express.static(__dirname + '/public/views'));
app.use(express.static(__dirname + '/public/controllers'));
app.use(express.static(__dirname + '/bower_components'));

var pongServer = new nodePong(io, http);
pongServer.init();
pongServer.start();