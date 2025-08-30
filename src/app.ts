import express from 'express';
import routes_v1 from './routes/v1';
import routes_v2 from './routes/v2';

export const createApp = () => {
  const app = express();
  app.use(express.json());

  app.use('/v1', routes_v1);
  app.use('/v2', routes_v2);

  return app;
};