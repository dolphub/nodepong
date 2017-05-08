import { server } from './server';
import sockets from './socket';

sockets.init();
server.start();