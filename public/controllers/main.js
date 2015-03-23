var app = angular.module('nodePong');

app.factory('socket', function() {
	var socket = io.connect();
	return socket;
});

app.controller('pongCtrl', ['$scope', 'socket', '$log', '$interval', '$window', function($scope, socket, $log, $interval, $window) {

	// Initialize the court
	$scope.court = {};
	$scope.court.width = $window.innerWidth;
	$scope.court.height = $window.innerHeight;
	
	$scope.initGame = function() {
	
		// $scope.initCourt(); // not required yet
		$scope.initBall(5, 60, 20);
	};

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
			$scope.context = court.getContext('2d');

			$scope.ball = {};
			$scope.ball.dx=delta;
			$scope.ball.dy=delta;

			$scope.ball.x = $scope.court.width / 2;
			$scope.ball.y = $scope.court.height / 2;
			$scope.ball.radius = radius;

			setTimeout(function() {
				setInterval( $scope.moveBall, 1000 / fps );	
			}, 50);			
		}		
	};

	/**
	 * Redraws the ball in the new updated position
	 * Uses delta x and delta y as change interval
	 * Uses setInterval for rate of change (fps)
	 */
	$scope.moveBall = function() {

		$scope.context.clearRect( 0, 0, $scope.court.width, $scope.court.height );		
		// Begin Draw
		$scope.context.beginPath();
		// Fill ball with black
		$scope.context.fillStyle="#000000";
		$scope.context.arc( $scope.ball.x, $scope.ball.y, 20, 0, Math.PI*2, true ); // xPos, yPos, radius, ,arc, 
		$scope.context.closePath();  // End Draw
		// Fill
		$scope.context.fill();
		
		if( $scope.ball.x < 0 + $scope.ball.radius || $scope.ball.x > $scope.court.width - $scope.ball.radius )
			$scope.ball.dx = -$scope.ball.dx;
		if( $scope.ball.y < 0 + $scope.ball.radius|| $scope.ball.y > $scope.court.height - $scope.ball.radius )
			$scope.ball.dy = -$scope.ball.dy;

		$scope.ball.x += $scope.ball.dx;
		$scope.ball.y += $scope.ball.dy;

		// Update ball position on server
		socket.emit('ball possition', $scope.ball );
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