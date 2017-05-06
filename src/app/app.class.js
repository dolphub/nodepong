// import { Server } from 'http';
// import morgan from 'morgan';

// const app = express();
// const http = Server(app);
// const io = require('socket.io')(http);

// import config from './config';

// // const nodePong = require('./pongServer');
// app.use(morgan('dev'));
// app.use(express.static(path.join(__dirname, './../../dist')));


// // TODO: Set up express app as class
// // Set up express app to load routes dynamically using router

// //
// // // Can get configuration from admin page
// // let ball = {
// // 	'delta_x': 1,
// // 	'delta_y': 1,
// // 	'fps': 15,
// // 	'radius': 20
// // };
// //
// // var pongServer = new nodePong(io, http, ball);
// //
// //
// // // Start server, start listeners
// // pongServer.initServer();
// // pongServer.startServer();

// // console.log(config);
// let listener = http.listen(config.PORT, config.HOST, () => {
//     // console.log(listener);
//     console.log(`Server listening on ${listener.address().address}:${listener.address().port}`.green);
// });
