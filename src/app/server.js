import express from 'express';
import http from 'http';
import IO from 'socket.io';

import config, { logger } from './config';
import expressapp from './express';

class ServerImplementation {

    constructor() {
        this.instance = http.createServer(expressapp);
        this.io = IO(this.instance);
        
    }

    start() {
        if (this.instance.address()) {
            logger.warn(`Server already started on port ${this.instance.address().port}.`);
            return;
        }
        this.instance.on('listening', onListening.bind(this));
        this.instance.on('error', onError.bind(this));
        this.instance.listen(config.server.PORT, config.server.HOST);
    }

    restart() {
        // TODO:
        return;
    }
}

function onListening() {
    logger.info(`Listening on port ${this.instance.address().port}`);
}

function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }
    switch (error.code) {
        case 'EACCES':
            console.error(`Server requires elevated privileges`);
            process.exit(1);
            break;

        case 'EADDRINUSE':
            console.error(`Port ${this.port} is already in use`);
            process.exit(1);
            break;
        default:
            throw error;
    }
}

// Singleton Implementation: export let
export let server = new ServerImplementation();