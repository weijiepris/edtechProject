import 'reflect-metadata';
import { db } from '../src/config/db';

const resetDatabase = async () => {
  try {
    await db(true)
      .initialize()
      .then(async database => {
        await database.dropDatabase();
        await database.synchronize();
        await database.destroy();
        process.exit(0);
      });
  } catch (err) {
    console.error('Error resetting the database:', err);
    process.exit(1);
  }
};

resetDatabase();
