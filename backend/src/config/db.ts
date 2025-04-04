import 'reflect-metadata';
import { DataSource } from 'typeorm';

const entitiesDir = 'dist/models/*.entity.js';
const typedEntitiesDir = 'src/models/*.entity.ts';

const {
  POSTGRES_USER: username = 'edtechuser',
  POSTGRES_PASSWORD: password = 'edtech123',
  POSTGRES_DB: database = 'edtech'
} = process.env;

export const db = (runSeed = false) =>
  new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username,
    password,
    database,
    synchronize: true,
    logging: false,
    entities: [runSeed ? typedEntitiesDir : entitiesDir],
    migrations: [],
    subscribers: []
  });

export default db;
