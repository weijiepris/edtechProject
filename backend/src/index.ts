import { createServer } from 'node:http';
import express from './expressModule';
import db from './config/db';
import { useRoutes } from './services';
import { applyMiddleware } from './middleware';

const run = async () => {
  db.initialize()
    .then(async () => {
      console.info('Database connection initialised');
    })
    .catch(error => {
      if (error.code === 'ECONNREFUSED') {
        throw new Error('Unable to initialise database, is your container running?');
      } else {
        console.error('database has error: ', error);
      }
    });

  const app = express();

  applyMiddleware(app);
  useRoutes(app);

  const server = createServer(app);

  const PORT = parseInt(process.env.PORT || '8000');
  server.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

run();
