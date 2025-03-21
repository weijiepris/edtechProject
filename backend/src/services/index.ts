import { Router } from 'express';
import authRouter from '../services/auth';
import { requestLogger } from '../middleware/requestLogger';

export const useRoutes = (app: Router): void => {
  app.use(requestLogger);

  app.use('/auth', authRouter);
};
