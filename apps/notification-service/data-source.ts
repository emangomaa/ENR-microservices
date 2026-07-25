import * as dotenv from 'dotenv';
dotenv.config({
  path: 'apps/user-service/.env',
});
import { DataSource } from 'typeorm';
console.log({
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
});
export default new DataSource({
  type: 'postgres',

  host: process.env.DATABASE_HOST,

  port: Number(process.env.DATABASE_PORT),

  username: process.env.DATABASE_USERNAME,

  password: process.env.DATABASE_PASSWORD,

  database: process.env.DATABASE_NAME,

  entities: [],

  migrations: ['apps/notification-service/migrations/*.ts'],
});