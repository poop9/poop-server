import express from 'express';
import { Action, useExpressServer } from 'routing-controllers';

const app: express.Application = express();

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

export default app;
