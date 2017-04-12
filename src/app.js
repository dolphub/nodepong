const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const nodePong = require('./pongServer');

app.use(express.static('./dist'));

// Can get configuration from admin page
let ball = {
	'delta_x': 1,
	'delta_y': 1,
	'fps': 15,
	'radius': 20
};

var pongServer = new nodePong(io, http, ball);


// Start server, start listeners
pongServer.initServer();
pongServer.startServer();
