import express from 'express';
import socketIo, { Socket } from 'socket.io';
import { useExpressServer } from 'routing-controllers';

const app: express.Application = express();
const http = require('http').Server(app);
const io = socketIo(http);

useExpressServer(app, {
  routePrefix: 'api',
  defaultErrorHandler: false,
  // api route 연결
  controllers: [`${__dirname}/controllers/*.[tj]s`],
  middlewares: [`${__dirname}/middlewares/*.[tj]s`],
  interceptors: [`${__dirname}/interceptors/*[tj]s`],
});

// TODO: 모든 에러 response 같은 형태로 보내주도록 추가
app.use((err: any, _: express.Request, res: express.Response, ___: express.NextFunction) => {
  if (!res.headersSent) {
    res.status(err.httpCode || 500).send(err.message || 'something is wrong');
  }
});

io.on('connection', (socket:Socket) => {
  socket.on('message', (message: string) => {
    console.log(message);
  });
});

export default app;
