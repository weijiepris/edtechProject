import { User } from 'models';

declare module 'express-session' {
  interface Session {
    token?: string;
  }
}

declare module 'express' {
  interface Request {
    user?: User;
  }
}
