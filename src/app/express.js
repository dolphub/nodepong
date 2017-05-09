import express from 'express';
import bodyParser from 'body-parser';
import compression from 'compression';
import morgan from 'morgan';
import path from 'path';

class Express {
    constructor() {
        this.express = express();
        this.express.use(express.static(path.join(__dirname, './../../dist')));
        middleware.call(this);
        routes.call(this);
    }
}

// Private functions

function middleware() {
    this.express.use(morgan('dev'));
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: true }));
    this.express.use(compression());
}

function routes() {
    initBaseRoute.call(this);
    // this.express.use('/tags', TagRoutes);
}

function initBaseRoute() {
    this.express.get('/', (req, res) => {
        res.status(200).send('API Version 1.0');
    });
}

export default new Express().express;