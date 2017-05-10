import 'colors';
import winston from 'winston';

const LOG_LEVEL = process.env.NODE_ENV === 'production' ? 'info' : 'debug';
const Logger = new winston.Logger({
    level: LOG_LEVEL,
    transports: [
        new (winston.transports.Console)({
            colorize: 'all',
        }),
    ],
});

export default Logger;