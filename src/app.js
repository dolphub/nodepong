// const express = require('express');
// const app = express();
// const http = require('http').Server(app);
// const io = require('socket.io')(http);
// const path = require('path');
// require('colors');
//
// const nodePong = require('./pongServer');
// let pathname = path.join(__dirname, './../dist');
// app.use(express.static(pathname));
//
// // Can get configuration from admin page
// let ball = {
// 	'delta_x': 1,
// 	'delta_y': 1,
// 	'fps': 15,
// 	'radius': 20
// };
//
// var pongServer = new nodePong(io, http, ball);
//
//
// // Start server, start listeners
// pongServer.initServer();
// pongServer.startServer();
