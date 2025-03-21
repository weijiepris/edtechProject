import express, { Router } from '../expressModule';
import cors from 'cors';
import session from 'express-session';
import { SESSION_SECRET } from '../utils';

export const applyMiddleware = (app: Router): void => {
  app.use(
    session({
      secret: SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: {
        secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
        httpOnly: true,
        maxAge: 10 * 60 * 60 * 1000 // 10 hours
      }
    })
  );

  app.use(cors());
  app.use(express.json({}));
};

export default applyMiddleware;
