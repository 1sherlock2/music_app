// import { HttpModule } from '@nestjs/axios';
import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderTracks } from '../../db/entity/orderTracks.entity';
import { Track } from '../../db/entity/track.entity';
import { User } from '../../db/entity/user.entity';
import { FilePathModule } from '../../filePath/filePath.module';
import { WorkerPool } from '../../workerPool';
import { CloudinaryModule } from '../cloudinary/cloudinary.module';
import { UserModule } from '../user/user.module';
import { TrackController } from './track.controller';
import { TrackService } from './track.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Track, OrderTracks, User]),
    CloudinaryModule,
    FilePathModule,
    UserModule,
    HttpModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        timeout: configService.get('HTTP_TIMEOUT'),
        maxRedirects: configService.get('HTTP_MAX_REDIRECTS')
      }),
      inject: [ConfigService]
    })
  ],
  providers: [TrackService, WorkerPool],
  controllers: [TrackController]
})
export class TrackModule {}
