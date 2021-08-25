import * as uuid from 'uuid';
import * as path from 'path';
import * as fs from 'fs';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { Track } from 'src/db/entity/track.entity';
import { ITrackCreateStatus, IUploadObjectReduce } from 'src/interfaces/track.interface';
import httpMessages from 'src/utils/httpMessages';
import { Repository } from 'typeorm';
import { TrackCreateDTO } from './dto/trackCreate.dto';
import { FilePathService } from 'src/filePath/filePath.service';

@Injectable()
export class TrackService {
  constructor(
    @InjectRepository(Track)
    private readonly trackEntity: Repository<Track>,
    private readonly cloudinaryService: CloudinaryService,
    private readonly filePathService: FilePathService
  ) {}
  async create(trackCreateDTO: TrackCreateDTO): Promise<ITrackCreateStatus> {
    const { name, artist, img, audio } = trackCreateDTO;
    const imgPath: string = img && this.filePathService.create(img);
    const audioPath: string = audio && this.filePathService.create(audio);

    const reduceUpload = [imgPath, audioPath]
      .reduce(async (acc: any, path): Promise<IUploadObjectReduce> => {
        const uploadStatus = await this.cloudinaryService.uploadImage(path, 'music_app');
        const { success: uploadSuccess, urlImg, urlAudio } = uploadStatus;
        if (!uploadSuccess) {
          return { status: HttpStatus.BAD_REQUEST, message: httpMessages.errorUpladAudioInCloud };
          // return new HttpException(httpMessages.errorUpladAudioInCloud, HttpStatus.BAD_REQUEST);
        }
        acc.img = urlImg;
        acc.audio = urlAudio;
        return acc;
      }, {})
      .then((result) => console.log(result));
    // const track = await this.trackEntity.findOne({ where: { name } });
    // if (track) {
    //   return new HttpException(httpMessages.trackHasBeenCreated, HttpStatus.BAD_REQUEST);
    // }
    // const trackSave: Track = await this.trackEntity.create({ name, artist, img, audio });
    // await this.trackEntity.save(trackSave);
    console.log('reduceUpload', reduceUpload);
    return {
      success: true,
      message: httpMessages.trackWasCreated,
      status: HttpStatus.OK
    };
  }
}
