import * as dotenv from 'dotenv';
dotenv.config({
  path: 'apps/auth-service/.env',
});
import { User } from './src/auth/entities/user.entity';
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

  entities: [User],

  migrations: ['apps/auth-service/migrations/*.ts'],
});