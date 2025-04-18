import { Router } from 'express';
import classRouter from './student';
import authRouter from './auth';
import userRouter from './user';
import assignmentRouter from './assignment';
import { requestLogger } from '../middleware/requestLogger';

export const useRoutes = (app: Router): void => {
  app.use(requestLogger);

  app.use('/auth', authRouter);
  app.use('/user', userRouter);
  app.use('/student', classRouter);
  app.use('/assignment', assignmentRouter);
};
