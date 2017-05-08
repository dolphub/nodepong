import logger from './components/logger';

export { logger };

export default {
    server: {
        PORT: process.env.PORT || 3001,
        HOST: process.env.PORT || '127.0.0.1',
    },
};