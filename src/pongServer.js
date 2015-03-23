

function pongServer(_io, _http)
{
	this.users = {}; // Create object to store user socket ID's
	this.io = _io;	
	this.http = _http;
	// this.init();
}

/**
 * Initializes the socket events
 */
pongServer.prototype.init = function() {
	var self = this;
	/**
	 * @param {object} socket.io Object
	 * On new connection event handler
	 */
	this.io.on('connection', function(socket) {
		// Default username
		socket.username = '';
		console.log('Component is connecting...');

		// Disconnected event
		socket.on('disconnect', function() {
			// socket.broadcast.emit('user disconnected', socket.username);
			console.log('Component has disconnnected...');
		});

		socket.on('ball possition', function(ball) {
			console.log('Ball x:',ball.x,'y:',ball.y);
		});


	});
};

/**
 * Starts the server
 */
pongServer.prototype.start = function() {
	this.http.listen(3001, function() {
		console.log('pongServer server started on port 3001');
	});
};

/**
 * startGame will start the server side updates to the pong game
 */
pongServer.prototype.startGame = function() {
	//TODO Start the game, other functionaltiy
	// Will launch the ball, set scores to 0
};


module.exports = pongServer;