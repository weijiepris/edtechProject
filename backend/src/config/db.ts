import 'reflect-metadata';
import { DataSource } from 'typeorm';
const entitiesDir = 'dist/models/*.js';

const {
  POSTGRES_USER: username = 'edtechuser',
  POSTGRES_PASSWORD: password = 'edtech123',
  POSTGRES_DB: database = 'edtech'
} = process.env;

export default new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username,
  password,
  database,
  synchronize: true,
  logging: false,
  entities: [entitiesDir],
  migrations: [],
  subscribers: []
});
