class App {
    public express;

    constructor() {
        this.express = express();
        this.registerSchemas();
        this.middleware();
        this.routes();
    }

    private registerSchemas() {
      SchemaValidator.registerSchema('tag');
    }

    private middleware() {
        this.express.use(logger('dev'));
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: true }));
    }

    private routes() {
        this.initBaseRoute();
        this.express.use('/tags', TagRoutes);
    }

    private initBaseRoute() {
        this.express.get('/', (req, res) => {
            res.status(200).send('API Version 1.0');
        });
    }
}

export default new App().express;