import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  TypeOrmModuleAsyncOptions,
  TypeOrmModuleOptions
} from '@nestjs/typeorm';

const entities: string[] =
  process.env.NODE_ENV === 'development'
    ? ['./dist/**/*.entity.js']
    : ['./**/*.entity.js'];

export default class TypeOrmConfig {
  static getOrmConfig(configService: ConfigService): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: configService.get('DB_HOST'),
      port: configService.get('DB_PORT'),
      username: configService.get('DB_USERNAME'),
      password: configService.get('DB_PASSWORD'),
      database: configService.get('DB_NAME'),
      entities: entities,
      synchronize: true, // false for migrations
      logging: true,
      migrationsRun: true,
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
  ): Promise<TypeOrmModuleOptions> => TypeOrmConfig.getOrmConfig(configService),
  inject: [ConfigService]
};
