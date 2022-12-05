import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfigAsync } from '../typeOrmConfig/typeorm.config';
import { TrackModule } from './track/track.module';
import { UserModule } from './user/user.module';
import memoryStorage from 'multer';
import { RolesModule } from './roles/roles.module';
import { ScheduleModule } from '@nestjs/schedule';
import { EmailModule } from './email/email.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync(typeOrmConfigAsync),
    MulterModule.register({
      storage: memoryStorage()
    }),
    ScheduleModule.forRoot(),
    TrackModule,
    UserModule,
    RolesModule,
    EmailModule
  ]
})
export class IndexModule {}
