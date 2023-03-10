import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  TypeOrmModuleAsyncOptions,
  TypeOrmModuleOptions
} from '@nestjs/typeorm';

const isDev = process.env.NODE_ENV === 'development';
const entities: string[] = isDev
  ? ['./dist/**/*.entity.js']
  : ['./**/*.entity.js'];

export default class TypeOrmConfig {
  static getOrmConfig(configService: ConfigService): TypeOrmModuleOptions {
    console.log(
      'DB_HOST',
      configService.get(isDev ? 'DB_HOST' : 'DB_HOST_PROD')
    );
    return {
      type: 'postgres',
      host: configService.get(isDev ? 'DB_HOST' : 'DB_HOST_PROD'),
      port: Number(configService.get('DB_PORT')),
      username: configService.get('DB_USERNAME'),
      password: String(
        configService.get(isDev ? 'DB_PASSWORD' : 'DB_PASSWORD_PROD')
      ),
      database: configService.get('DB_NAME'),
      entities: entities,
      synchronize: isDev, // false for migrations
      autoLoadEntities: true,
      verboseRetryLog: true,
      logging: true,
      migrationsRun: true,
      // connectTimeoutMS: 2000,
      migrations: [__dirname + '/migrations/*{.ts,.js}'],
      cli: {
        migrationsDir: './migrations'
      }
    };
  }
}

export const typeOrmConfigAsync: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  useFactory: async (
    configService: ConfigService
  ): Promise<TypeOrmModuleOptions> =>
    await TypeOrmConfig.getOrmConfig(configService),
  inject: [ConfigService]
};
