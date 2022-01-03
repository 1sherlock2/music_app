// import { HttpModule } from '@nestjs/axios';
import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';
import { OrderTracks } from 'src/db/entity/orderTracks.entity';
import { User } from 'src/db/entity/user.entity';
import { FilePathModule } from 'src/filePath/filePath.module';
import { UserModule } from 'src/user/user.module';
import { Track } from '../db/entity/track.entity';
import { TrackController } from './track.controller';
import { TrackService } from './track.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Track, OrderTracks, User]),
    CloudinaryModule,
    FilePathModule,
    UserModule,
    // HttpModule.register({
    //   timeout: 2000,
    //   maxRedirects: 5
    // })
    HttpModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        timeout: configService.get('HTTP_TIMEOUT'),
        maxRedirects: configService.get('HTTP_MAX_REDIRECTS')
      }),
      inject: [ConfigService]
    })
  ],
  providers: [TrackService],
  controllers: [TrackController]
})
export class TrackModule {}
