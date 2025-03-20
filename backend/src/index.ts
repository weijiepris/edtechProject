import { createServer } from 'node:http';
import express from 'express';
import db from './config/db';
import { User } from './models/User.entity';
const run = async () => {
  const app = express();
  const server = createServer(app);

  db.initialize()
    .then(async () => {
      console.log('Inserting a new user into the database...');
      const user = new User();
      user.firstName = 'Timber';
      user.lastName = 'Saw';
      user.password = '1234';
      user.role = 'admin'
      user.age = 25;
      await db.manager.save(user);
      console.log('Saved a new user with id: ' + user.id);

      console.log('Loading users from the database...');
      const users = await db.manager.find(User);
      console.log('Loaded users: ', users);

      console.log('Here you can setup and run express / fastify / any other framework.');
    })
    .catch(error => {
      if (error.code === 'ECONNREFUSED') {
        throw new Error('Unable to initialise database, is your container running?');
      } else {
        console.error('error', error);
      }
    });

  const PORT = parseInt(process.env.PORT || '8000');
  server.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

run();
