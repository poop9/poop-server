import express from 'express';
import { useExpressServer } from 'routing-controllers';
import socketIo, { Socket } from 'socket.io';

const app: express.Application = express();
const http = require('http').Server(app);
const io = socketIo(http);

useExpressServer(app, {
  routePrefix: 'api',
  defaultErrorHandler: false,
});

app.use((err: any, _: express.Request, res: express.Response, ___: express.NextFunction) => {
  if (!res.headersSent) {
    res.status(err.httpCode || 500).send(err.message || 'something is wrong');
  }
});

app.get('/', (_, res) => {
  res.send('ah');
});

io.on('connection', (socket:Socket) => {
  socket.on('message', (message: string) => {
    console.log(message);
  });
});

export default app;
