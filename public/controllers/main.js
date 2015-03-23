var app = angular.module('nodePong', ['ui.bootstrap']);

app.factory('socket', function() {
	var socket = io.connect();
	return socket;
}).factory('Ball', [ '$log', function($log) {
	/**
	 * Ball function
	 */
	function Ball() {
		
	}

	/**
	 * @param {int} delta
	 * @param {int} fps
	 * @param {int} radius
	 */
	Ball.prototype.init = function(_delta, _fps, _radius, $scope) {

		this.delta_x = _delta;
		this.delta_y = _delta;
		this.fps = _fps;
		this.radius = _radius;

		this.x = $scope.court.width / 2;
		this.y = $scope.court.height / 2;

		this.context = court.getContext('2d');
		$log.info( 'Ball Initialized! ' + this );

		// Send to server ball information that will be used on the server

	};

	/**
	 * @param {int} X Coordinate
	 * @param {int} Y Coordinate
	 */
	Ball.prototype.updateBall = function($scope) {
		this.context.clearRect( 0, 0, $scope.court.width, $scope.court.height );		
		// Begin Draw
		this.context.beginPath();
		// Fill ball with black
		this.context.fillStyle="#000000";
		this.context.arc( this.x, this.y, 20, 0, Math.PI*2, true ); // xPos, yPos, radius, ,arc, 
		this.context.closePath();  // End Draw
		// Fill
		this.context.fill();
		
		if( this.x < 0 + this.radius || this.x > $scope.court.width - this.radius )
			this.delta_x = -this.delta_x;
		if( this.y < 0 + this.radius|| this.y > $scope.court.height - this.radius )
			this.delta_y = -this.delta_y;

		this.x += this.delta_x;
		this.y += this.delta_y;

		// Update ball position on server
		// socket.emit('ball possition', this.x, this.y );
	}

	return new Ball();
}]);

app.controller('pongCtrl', ['$scope', 'socket', '$log', '$interval', '$window', 'Ball', function($scope, socket, $log, $interval, $window, Ball) {

	// Initialize the court
	$scope.court = {};
	$scope.court.width = $window.innerWidth;
	$scope.court.height = $window.innerHeight;
	
	$scope.initGame = function() {
	
		// $scope.initCourt(); // not required yet
		Ball.init(1, 30, 20, $scope);
		$scope.Ball = Ball;

		socket.emit('ball ready', Ball.fps);
		// TODO: Send court information to allow wall detection on serverside
	};

	socket.on('update ball', function() {
		Ball.updateBall($scope);
		// Ball.updateBall($scope, socket) }, 1000 / Ball.fps
	});

	/**
	 * Initialize the court for this grid
	 */
	// $scope.initCourt = function() {
	// };


	/**
	 * @param {int} Ball X and Y Delta, change in movement
	 * @param {int} FPS of drawing, higher fps increases ball movement
	 * @param {int} Radius of ball
	 * Initialize and set ball properties
	 */
	$scope.initBall = function(delta, fps, radius) {
		if( !delta || !fps || delta <= 0 ) {
			$log.warn('Incorrect Delta');
		} else {

			$scope.ball = {};
			$scope.ball.dx=delta;
			$scope.ball.dy=delta;

			$scope.ball.x = $scope.court.width / 2;
			$scope.ball.y = $scope.court.height / 2;
			$scope.ball.radius = radius;


		}		
	};

	/**
	 * Redraws the ball in the new updated position
	 * Uses delta x and delta y as change interval
	 * Uses setInterval for rate of change (fps)
	 */
	$scope.moveBall = function() {


	};



	/**
	 * Change the court size on window resize
	 */
 	$(window).on("resize.doResize", function (){
        $log.info(window.innerWidth);
        $log.info(window.innerHeight);

        $scope.$apply(function(){
			$scope.court.width = $window.innerWidth;
			$scope.court.height = $window.innerHeight;
        });
    });

	/**
	 * @param {object} Keypress Event
	 * On Enter key it will send the message to the server
	 */
	// $scope.sendMessage = function(e) {
	//   if( e.which === 13 && $scope.msg !== "" ) {
	//   	socket.emit('chat message', $scope.msg);
	//   	$scope.msg = "";
	//   }	    
	// }

	// // Message event
	// socket.on('chat message', function(msg) {
	//   $scope.addMsg(msg);
	// });

}]);