import 'colors';
import * as winston from 'winston';

const Logger = new winston.Logger({
    level: 'info',
    transports: [
        new (winston.transports.Console)(),
    ],
});

export default Logger;