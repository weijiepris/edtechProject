import express, { Router } from '../expressModule';
import cors from 'cors';

export const applyMiddleware = (app: Router): void => {
  app.use(cors());
  app.use(express.json({}));
};

export default applyMiddleware;
