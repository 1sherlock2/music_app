import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';
import { FilePathModule } from 'src/filePath/filePath.module';
import { UserModule } from 'src/user/user.module';
import { Track } from '../db/entity/track.entity';
import { TrackController } from './track.controller';
import { TrackService } from './track.service';

@Module({
  imports: [TypeOrmModule.forFeature([Track]), CloudinaryModule, FilePathModule, UserModule],
  providers: [TrackService],
  controllers: [TrackController]
})
export class TrackModule {}
