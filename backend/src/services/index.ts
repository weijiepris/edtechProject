import { Router } from 'express';
import authRouter from '../services/auth';
import userRouter from '../services/user';
import { requestLogger } from '../middleware/requestLogger';

export const useRoutes = (app: Router): void => {
  app.use(requestLogger);

  app.use('/auth', authRouter);
  app.use('/user', userRouter);
};
