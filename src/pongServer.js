

function pongServer(_io, _http)
{
	this.users = {}; // Create object to store user socket ID's
	this.io = _io;	
	this.http = _http;
	// this.init();
}

/**
 * Starts the server
 */
pongServer.prototype.start = function() {
	this.http.listen(3001, function() {
		console.log('pongServer server started on port 3001');
	});
};


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

		// Broadcast to all other connected users that a new user is connecting
		console.log('New Connection...');

		// Disconnected event
		socket.on('disconnect', function() {
			// socket.broadcast.emit('user disconnected', socket.username);
			console.log('Component has disconnnected...');
		});
	});

};


module.exports = pongServer;