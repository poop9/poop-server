import express from 'express';
import { Action, useExpressServer } from 'routing-controllers';
import socketIo, { Socket } from 'socket.io';
import { GeolocationService } from './services/GeolocationService';
import { UserService } from './services/UserService';
import { AuthHelper } from './utils/AuthHelper';

const app: express.Application = express();
const http = require('http').Server(app);
const io = socketIo(http);

useExpressServer(app, {
  routePrefix: 'api',
  defaultErrorHandler: false,
  authorizationChecker: async (action: Action) => {
    const bearerToken = <string>action.request.headers['authorization'];
    if (!bearerToken) return false;
    return true;
  },
  currentUserChecker: async (action: Action) => {
    const token = action.request.headers['authorization'].replace(/Bearer\s/, '');
    const authModel = AuthHelper.extract(token);
    if (!authModel) return false;
    const user = await new UserService().getUser(authModel.uuid, authModel.nickname);
    if (!user) return false;
    return user;
  },
  controllers: [`${__dirname}/controllers/*.[tj]s`],
  middlewares: [`${__dirname}/middlewares/*.[tj]s`],
  interceptors: [`${__dirname}/interceptors/*[tj]s`],
});

app.use((err: any, _: express.Request, res: express.Response, ___: express.NextFunction) => {
  if (!res.headersSent) {
    res.status(err.httpCode || 500).send(err.message || 'something is wrong');
  }
});

io.on('connection', (socket:Socket) => {
  socket.on('new message', (token: string, message: string) => {
    const authModel = AuthHelper.extract(token);
    if (authModel && message === 'yo!') {
      const user = new UserService().getUser(authModel.uuid, authModel.nickname);
      if (!!user) throw Error('NO USER');
      new GeolocationService().sendYa(user, socket);
    }
  });
});

export default app;
