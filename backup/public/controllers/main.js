const io = require('socket.io-client');

/* global angular */
angular.module('nodepong', []);

angular.module('nodepong')
.factory('socket', () => {
    const socket = io.connect();
    return socket;
}).factory('ball', () => {
    function Ball() {
        this.context = document.getElementById('court').getContext('2d');
    }

    /**
     * @param {int} X Coordinate
     * @param {int} Y Coordinate
     */
    Ball.prototype.updatePos = ($scope, ball) => {
        this.context.clearRect(0, 0, $scope.court.width, $scope.court.height);
        // Begin Draw
        this.context.beginPath();
        // Fill ball with black
        this.context.fillStyle = '#000000';
        this.context.arc(
            ball.x - $scope.court.x_offset,
            ball.y - $scope.court.y_offset,
            ball.radius,
            0,
            Math.PI * 2,
            true);
        this.context.closePath();  // End Draw
        this.context.fill();
    };

    return new Ball();
});

angular.module('nodepong')
.controller('pongCtrl', ['$scope', 'socket', '$log', '$interval', '$window', 'Ball', ($scope, socket, $log, $interval, $window, Ball) => {
    $scope.court = {};
    $scope.court.ID = -1;
    $scope.court.x_offset = 0;
    $scope.court.y_offset = 0;
    /**
     * @param {id} CourtID
     * Server detects a new browser connection, sends the courtID
     */
    socket.on('court id', (id) => {
        $scope.court.ID = id;
        $scope.court.width = $window.innerWidth;
        $scope.court.height = $window.innerHeight;
        $scope.$digest();

        socket.emit('configure court', $scope.court);
    });

    socket.on('update court', (courts) => {
        $scope.court.x_offset = 0;
        $scope.court.y_offset = 0;
        if (courts.length > 1) {
            courts.forEach((i) => {
                if (courts[i].court.ID === $scope.court.ID) { // This courts configuration
                    for (let x = 0; x < i; x++) {
                        $scope.court.x_offset += courts[x].court.width;
                        // $scope.y_offset += courts[x].court.height;
                    }
                }
            });
        }
    });

    // Receive new ball position
    socket.on('update ball', (_ball) => {
        Ball.updatePos($scope, _ball);
    });

    /**
     * Change the court size on window resize
     */
    $(window).on('resize.doResize', () => {
        $log.info(window.innerWidth);
        $log.info(window.innerHeight);
    });
}]);
