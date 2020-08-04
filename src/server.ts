import http from 'http';

import app from './app';

const server = new http.Server(app);

server.listen(process.env.PORT);

export default server;
