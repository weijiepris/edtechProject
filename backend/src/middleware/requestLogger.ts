import { NextFunction, Request, RequestHandler, Response } from 'express';

export const requestLogger: RequestHandler = (req: Request, _res: Response, next: NextFunction) => {
  console.info(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl} - ${req.ip}`);
  next();
};
