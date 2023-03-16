import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  TypeOrmModuleAsyncOptions,
  TypeOrmModuleOptions
} from '@nestjs/typeorm';
import { DataSource, DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config();
const isDev = process.env.NODE_ENV === 'development';
const entities: string[] = isDev
  ? ['./dist/**/*.entity.js']
  : ['./**/entity/*.entity.js'];

console.log('HOST', process.env[isDev ? 'DB_HOST' : 'DB_HOST_PROD']);
console.log(
  'PASSWORD',
  process.env[isDev ? 'DB_PASSWORD' : 'DB_PASSWORD_PROD']
);
const isMigration = process.env.NODE_ENV === 'migration';
console.log({ isMigration });
export const dbConnection: DataSourceOptions = {
  type: 'postgres',
  host: process.env[isDev ? 'DB_HOST' : 'DB_HOST_PROD'],
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: String(process.env[isDev ? 'DB_PASSWORD' : 'DB_PASSWORD_PROD']),
  database: process.env.DB_NAME,
  logging: true,
  entities: ['src/**/*.entity{.ts,.js}'],
  migrations: ['migrations/*.ts}'],
  synchronize: !isMigration,
  migrationsRun: true
};

const AppDataSource = new DataSource(dbConnection);
if (isMigration) {
  AppDataSource.initialize()
    .then(() => console.log('Data Source has been initialized!'))
    .catch((err) => {
      console.error('Error during Data Source initialization', err);
    });
}

export default AppDataSource;
