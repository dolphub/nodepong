import express from 'express';
import http from 'http';
import IO from 'socket.io';

import { logger } from './config';
import App from './app';

const port = process.env.PORT || 3001;
const host = process.env.PORT || '127.0.0.1';

class ServerImplementation {

    constructor() {
        this.instance = http.createServer(App);
        this.io = IO(this.instance);
    }

    start() {
        if (this.instance.address()) {
            logger.warn(`Server already started on port ${this.instance.address().port}.`);
            return;
        }
        this.instance.on('listening', onListening.bind(this));
        this.instance.on('error', onError.bind(this));
        this.instance.listen(port, host);
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