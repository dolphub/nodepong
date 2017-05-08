import { server } from './../server';
import { logger } from './../config';

export default {
    init: init,
}

function init() {
    server.io.on('connection', onConnection);
}

function onConnection(socket) {
    logger.info(`New connection. SocketID: ${socket.id}`);
}