import { Router } from 'express';
import classRouter from './student';
import authRouter from './auth';
import userRouter from './user';
import teacherRouter from './teacher';
import parentRouter from './parent';
import assignmentRouter from './assignment';
import chatRouter from './chat';
import { requestLogger } from '../middleware/requestLogger';

export const useRoutes = (app: Router): void => {
  app.use(requestLogger);

  app.use('/auth', authRouter);
  app.use('/user', userRouter);
  app.use('/student', classRouter);
  app.use('/teacher', teacherRouter);
  app.use('/parent', parentRouter);
  app.use('/assignment', assignmentRouter);
  app.use('/chat', chatRouter);
};
