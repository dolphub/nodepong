var app = angular.module('nodePong', ['ui.bootstrap']);

app.factory('socket', function() {
	var socket = io.connect();
	return socket;
}).factory('Ball', [ '$log', function($log) {
	/**
	 * Ball function
	 */
	function Ball() {
		this.context = court.getContext('2d');
	}

	/**
	 * @param {int} X Coordinate
	 * @param {int} Y Coordinate
	 */
	Ball.prototype.updatePos = function($scope, ball) {
		this.context.clearRect( 0, 0, $scope.court.width, $scope.court.height );		
		// Begin Draw
		this.context.beginPath();
		// Fill ball with black
		this.context.fillStyle="#000000";
		this.context.arc( ball.x - $scope.court.x_offset, ball.y - $scope.court.y_offset, ball.radius, 0, Math.PI*2, true ); // xPos, yPos, radius, ,arc, 
		this.context.closePath();  // End Draw
		this.context.fill();
	}

	return new Ball();
}]);

app.controller('pongCtrl', ['$scope', 'socket', '$log', '$interval', '$window', 'Ball', function($scope, socket, $log, $interval, $window, Ball) {

	$scope.court = {};
	$scope.court.ID = -1;
	$scope.court.x_offset = 0;
	$scope.court.y_offset = 0;
	/**
	 * @param {id} CourtID
	 * Server detects a new browser connection, sends the courtID
	 */
	socket.on('court id', function(id) {
		$scope.court.ID = id;
		$scope.court.width = $window.innerWidth;
		$scope.court.height = $window.innerHeight;
		$scope.$digest();
		
		socket.emit('configure court', $scope.court);
	});

	socket.on('update court', function(courts) {
		$scope.court.x_offset = 0;
		$scope.court.y_offset = 0;
		if( courts.length > 1 ){
			for( i in courts ) {
				if( courts[i].court.ID == $scope.court.ID ) { // This courts configuration
					for( x=0; x<i; x++ ) {
						$scope.court.x_offset += courts[x].court.width;
						// $scope.y_offset += courts[x].court.height;
					}
					return;
				}
			}
		}
		
		console.log(courts);
	});

	// Receive new ball position
	socket.on('update ball', function(_ball) {
		Ball.updatePos($scope, _ball);
	});

	/**
	 * Change the court size on window resize
	 */
 	$(window).on("resize.doResize", function (){
        $log.info(window.innerWidth);
        $log.info(window.innerHeight);

        $scope.$apply(function(){
			$scope.court.width = $window.innerWidth;
			$scope.court.height = $window.innerHeight;
			//TODO:: Send new screen configurations to server for updating collisions
        });
    });
}]);