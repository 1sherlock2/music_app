// import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';
import { FilePathModule } from 'src/filePath/filePath.module';
import { UserModule } from 'src/user/user.module';
import { Track } from '../db/entity/track.entity';
import { TrackController } from './track.controller';
import { TrackService } from './track.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Track]),
    CloudinaryModule,
    FilePathModule,
    UserModule,
    // HttpModule.register({
    //   timeout: 2000,
    //   maxRedirects: 5
    // })
  ],
  providers: [TrackService],
  controllers: [TrackController]
})
export class TrackModule {}
