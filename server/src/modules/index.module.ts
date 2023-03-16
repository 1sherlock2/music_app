import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrackModule } from './track/track.module';
import { UserModule } from './user/user.module';
import memoryStorage from 'multer';
import { RolesModule } from './roles/roles.module';
import { ScheduleModule } from '@nestjs/schedule';
import { EmailModule } from './email/email.module';
import { dbConnection } from '../typeOrmConfig/typeorm.config';
import * as path from 'path';
import { UserEntity } from '../db/entity/user.entity';
import { TrackEntity } from '../db/entity/track.entity';
import { OrderTracksEntity } from '../db/entity/orderTracks.entity';
import { RoleEntity } from '../db/entity/roles/roles.entity';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      ...dbConnection,
      autoLoadEntities: true,
      entities:
        process.env.NODE_ENV === 'development'
          ? [UserEntity, TrackEntity, OrderTracksEntity, RoleEntity]
          : [path.resolve('dist/src/db/entity/*.entity.js')]
    }),
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
