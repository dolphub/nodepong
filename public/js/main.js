var app = angular.module('nodePong', ['ui.bootstrap']);

app.factory('socket', function() {
	var socket = io.connect();
	return socket;
});

app.controller('pongCtrl', ['$scope', 'socket', function($scope, socket) {


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