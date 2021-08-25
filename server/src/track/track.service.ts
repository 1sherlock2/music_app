import * as uuid from 'uuid';
import * as path from 'path';
import * as fs from 'fs';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { Track } from 'src/db/entity/track.entity';
import {
  IResultCloudinary,
  ITrackCreateStatus,
  IUploadObjectReduce,
  IUploadStatus
} from 'src/interfaces/track.interface';
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
    const arrayPath = [imgPath, audioPath].filter(Boolean);

    const multipleUpload = arrayPath.map((path) => {
      return this.cloudinaryService.uploadFile(path, 'music_app');
    });
    const resposeUploadFiles = await Promise.all(multipleUpload);
    const reduceResult = resposeUploadFiles.reduce(
      (acc: IResultCloudinary, response: IUploadObjectReduce) => {
        const { success, urlImg, urlAudio } = response;
        if (!success) {
          throw new HttpException(httpMessages.errorUpladAudioInCloud, HttpStatus.BAD_GATEWAY);
        }
        if (urlImg) acc.cloudinaryImg = urlImg;
        if (urlAudio) acc.cloudinaryAudio = urlAudio;
        return acc;
      },
      {}
    );
    const { cloudinaryImg, cloudinaryAudio } = reduceResult;
    const trackSave: Track = await this.trackEntity.create({
      name,
      artist,
      img: cloudinaryImg,
      audio: cloudinaryAudio
    });
    await this.trackEntity.save(trackSave);
    // const reduceObj = await arrayPath.reduce(
    //   async (acc: any, path: string): Promise<IUploadObjectReduce | HttpException> => {
    //     const uploadStatus = await this.cloudinaryService.uploadFile(path, 'music_app');
    //     const { success: uploadSuccess = false, urlImg, urlAudio } = uploadStatus;
    //     if (!uploadSuccess) {
    //       return new HttpException(httpMessages.errorUpladAudioInCloud, HttpStatus.BAD_REQUEST);
    //     }
    //     if (urlImg) acc.img = urlImg;
    //     if (urlAudio) acc.audio = urlAudio;
    //     return acc;
    //   },
    //   {}
    // );

    // const track = await this.trackEntity.findOne({ where: { name } });
    // if (track) {
    //   return new HttpException(httpMessages.trackHasBeenCreated, HttpStatus.BAD_REQUEST);
    // }
    // const trackSave: Track = await this.trackEntity.create({ name, artist, img, audio });
    // await this.trackEntity.save(trackSave);
    return {
      success: true,
      message: httpMessages.trackWasCreated,
      status: HttpStatus.OK
    };
  }
}
