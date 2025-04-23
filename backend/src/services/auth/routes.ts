import { NextFunction, Request, Response } from 'express';
import { User } from '../../models';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { JWT_SECRET, JWT_EXPIRE_DURATION } from '../../utils';

export const test = (req: Request, res: Response, next: NextFunction) => {
  res.send({ test: 'hello' });
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    console.info({ message: 'Email or password are empty' });
    res.status(400).json({ message: 'You have entered an invalid login details!' });
    return;
  }

  try {
    const user = await User.findOne({
      where: { email },
      select: { uuid: true, email: true, password: true }
    });

    if (!user) {
      console.info({ message: 'user does not exist' });
      res.status(401).json({ message: 'You have entered an invalid login details!' });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.info({ message: 'password dont match' });
      res.status(401).json({ message: 'You have entered an invalid login details!' });
      return;
    }

    const token = jwt.sign({ uuid: user.uuid, email: user.email }, JWT_SECRET, {
      expiresIn: parseInt(JWT_EXPIRE_DURATION)
    });

    req.session.token = token;

    res.status(200).json({ token });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Something went wrong' });
    return;
  }
};

export const register = async (req: Request, res: Response) => {
  const { firstName, lastName, email, password, age } = req.body;

  if (!firstName || !lastName || !email || !password || !age) {
    res.status(400).json({ message: 'All fields are required' });
    return;
  }

  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      res.status(400).json({ message: 'Email already in use' });
      return;
    }

    // Hash password
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      age
    });

    await User.save(newUser);

    // Generate JWT token
    const token = jwt.sign({ uuid: newUser.uuid, email: newUser.email }, JWT_SECRET, {
      expiresIn: parseInt(JWT_EXPIRE_DURATION)
    });

    res.status(201).json({
      token,
      user: {
        id: newUser.uuid,
        email: newUser.email,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        age: newUser.age,
        role: newUser.role
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Something went wrong' });
    return;
  }
};

export const logout = (req: Request, res: Response) => {
  req.session.destroy(err => {
    if (err) {
      console.error('Logout error:', err);
      res.status(500).json({ message: 'Failed to logout' });
      return;
    }

    res.clearCookie('connect.sid', {
      path: '/',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict'
    });

    res.status(200).json({ message: 'Logged out successfully' });
    return;
  });
};

export const validate = async (req: Request, res: Response) => {
  const authHeader = req.headers['authorization'];
  const sessionToken = req.session.token;
  const message = 'Not logged in';

  if (!authHeader && !sessionToken) {
    console.info({ authError: 'Unauthorized: no token found' });
    res.status(401).json({ message });
    return;
  }

  const token = authHeader?.split(' ')[1] || sessionToken;
  if (!token) {
    console.info({ authError: 'Unauthorized: Invalid token format' });
    res.status(401).json({ message });
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
      console.info({ authError: `user object not found: ${decoded.uuid}` });
      res.status(401).json({ message });
      return;
    }

    res.status(200).json({ message: 'success' });
  } catch (error) {
    console.error({ message: 'Unauthorized: Invalid token' });
    res.status(401).json({ message });
    return;
  }
};

export const getAccount = async (req: Request, res: Response) => {
  const { uuid } = req.user ?? {};

  const user = await User.findOneBy({
    uuid
  });

  if (!user) {
    console.info({ authError: `[getAccount] Unable to find user account: ${uuid}` });
    res.status(401).json({ message: 'Not logged in' });
    return;
  }

  res.status(200).json(user);
  return;
};
