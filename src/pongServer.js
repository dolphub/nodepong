
/**
 * @param {object} socket.io library
 * @param {object} http library
 * @param {object} Ball Object showing ball specific parameters
 */
function pongServer(_io, _http, _ball) {
    this.users = {};
    this.io = _io;
    this.http = _http;
    this.ball = _ball;
    this.court = null;
    this.configuredCourts = [];
    this.hasOneCourt = false,
    this.ballLoop = null;
    this.court = {};
    this.court.width = 0;
    this.court.height = 0;
}

/**
 * Initializes the socket events
 */
pongServer.prototype.initServer = function() {
    var self = this;
    /**
     * @param {object} socket.io Object
     * On new connection event handler
     */
    this.io.on('connection', function(socket) {
    console.log('Component is connecting...');

    // Court ID
    socket.emit('court id', self.configuredCourts.length);

    // Disconnected event
    socket.on('disconnect', function() {
    console.log('Component has disconnnected...');
    if( self.configuredCourts.length > 0 ) {
    console.log("Removing Court", self.findID(socket.id),"...");
    self.configuredCourts.splice(self.findID(socket.id), 1);
    self.reAssignIDs();
    self.buildCourt();
    }
    else {
    clearInterval(self.ballLoop);
    self.ballLoop = null;
    }
     // rebuild new court size

    });

    /**
     * @param {object} courtObj, width|height|other
     * Will eventually handle n-courts
     */
    socket.on('configure court', function(courtObj) {
    if( courtObj.width > 0 && courtObj.height > 0 && courtObj.ID > self.configuredCourts.length - 1) {
    console.log('Received configure court event');
    self.configureCourt( courtObj, socket );
    }
    });

    });
};

pongServer.prototype.findID = function(sock) {
    for( i in this.configuredCourts ) {
    if( this.configuredCourts[i].socket == sock )
    return i;
    }
}

pongServer.prototype.reAssignIDs = function() {
    if( this.configuredCourts.length > 0 ) {
    for( i in this.configuredCourts ) {
    this.configuredCourts[i].court.ID = i;
    console.log('>>>>>Reassigning Court', i, this.configuredCourts[i].socket);
    this.io.sockets.connected[this.configuredCourts[i].socket].emit('court id', i);
    }
    }
};

pongServer.prototype.initBall = function(_info) {
    // Initialize Ball
    console.log('Initializing Ball');
    this.ball = {};
    this.ball.delta_x = _info.delta;
    this.ball.delta_y = _info.delta;
    this.ball.fps = _info.fps;
    this.ball.radius = _info.radius;
};

/**
 * @param {object} court dimensions for this specific socket connection
 */
pongServer.prototype.configureCourt = function(_court, sock) {
    this.configuredCourts.push( {'court': _court, 'socket': sock.id} );
    console.log(_court);


    // Build/Rebuild Court with new courts connecting
    this.buildCourt();
    this.startGame();
};


/**
 * buildCourt
 * Rebuilds the courts dimensions with the new components connecting
 */
pongServer.prototype.buildCourt = function() {

    this.court.width = 0;
    this.court.height = 0;
    if( this.configuredCourts.length > 0 ) {
    for( i=0; i<this.configuredCourts.length; i++ ) {
    this.court.width += this.configuredCourts[i].court.width;
    }
    this.court.height = this.configuredCourts[0].court.height; // Take the first height
    this.resetBall();
    this.io.sockets.emit('update court', this.configuredCourts);
    console.log('Rebuilt court of size:', this.configuredCourts.length, this.court);
    }

};

/**
 * resets the position of the ball to the middle of the configured court
 */
pongServer.prototype.resetBall = function() {
    console.log('Restting ball position');
    this.ball.x = this.court.width / 2;
    this.ball.y = this.court.height / 2;
};

/**
 * Starts the server
 */
pongServer.prototype.startServer = function() {
    this.http.listen(3001, function() {
    console.log('pongServer server started on port 3001');
    });
};

/**
 * startGame will start the server side updates to the pong game
 */
pongServer.prototype.startGame = function() {
    console.log('Starting Game...');
    var self = this;
    if( !self.ballLoop ) {
    self.ballLoop = setInterval(function() {
    self.updateBall();
    }, self.ball.fps / 1000 );

    //TODO Start the game, other functionaltiy
    // Will launch the ball, set scores to 0
    }
};

pongServer.prototype.stopGame = function() {
    clearInterval(self.ballLoop);
    self.ballLoop = null;
};

/**
 * updateBall will update the balls x and y position based on the delta configured for the ball
 * Wall collisions are detected here
 */
pongServer.prototype.updateBall = function() {
    if( this.ball.x < 0 + this.ball.radius / 2 || this.ball.x > this.court.width - this.ball.radius / 2 )
    this.ball.delta_x = -this.ball.delta_x;
    if( this.ball.y < 0 + this.ball.radius / 2 || this.ball.y > this.court.height - this.ball.radius / 2 )
    this.ball.delta_y = -this.ball.delta_y;

    this.ball.x = this.ball.x + this.ball.delta_x;
    this.ball.y = this.ball.y + this.ball.delta_y;

    this.io.emit('update ball', this.ball);
};


module.exports = pongServer;
