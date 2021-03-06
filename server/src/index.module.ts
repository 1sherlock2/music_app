import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfigAsync } from './config/typeorm.config';
import { TrackModule } from './track/track.module';
import { UserModule } from './user/user.module';
import * as memoryStorage from 'multer';
import { RolesModule } from './roles/roles.module';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync(typeOrmConfigAsync),
    MulterModule.register({
      storage: memoryStorage()
    }),
    TrackModule,
    UserModule,
    RolesModule
  ]
})
export class IndexModule {}
