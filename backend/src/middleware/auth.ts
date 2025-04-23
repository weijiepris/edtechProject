import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models';
import { JWT_SECRET } from '../utils';

export const isLoggedIn = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const authHeader = req.headers['authorization'];
  const sessionToken = req.session.token;

  if (!authHeader && !sessionToken) {
    console.error({ authError: 'Unauthorized: no token found' });
    res.status(401).json({ message: 'You are not authenticated, please login' });
    return;
  }

  const token = authHeader?.split(' ')[1] || sessionToken;
  if (!token) {
    console.error({ authError: 'Unauthorized: Invalid token format' });
    res.status(401).json({ message: 'You are not authenticated, please login' });
    return;
  }

  try {
    const decoded: any = jwt.verify(token, JWT_SECRET);

    const user = await User.findOne({
      where: {
        uuid: decoded.uuid
      }
    });

    if (!user) {
      res.status(401).json({ message: 'You are not authenticated, please login' });
      return;
    }

    req.user = user;
    next();
  } catch (error) {
    console.error({ message: 'Unauthorized: Invalid token' });
    res.status(401).json({ message: 'Unauthorized: Invalid token' });
    return;
  }
};
