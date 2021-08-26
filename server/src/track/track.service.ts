import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { Track } from 'src/db/entity/track.entity';
import {
  IResultCloudinary,
  ITrackCreateStatus,
  IUploadObjectReduce
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
    const { name, artist, img, audio, userId } = trackCreateDTO;
    const imgPath: string = img && this.filePathService.create(img);
    const audioPath: string = audio && this.filePathService.create(audio);
    const arrayPath = [imgPath, audioPath].filter(Boolean);

    const multipleUpload = arrayPath.map((path) => {
      return this.cloudinaryService.uploadFile(path, 'music_app');
    });
    const resposeUploadFiles = await Promise.all(multipleUpload);
    const objectResult = resposeUploadFiles.reduce(
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
    const { cloudinaryImg, cloudinaryAudio } = objectResult;
    const trackSave: Track = await this.trackEntity.create({
      name,
      artist,
      userId,
      img: cloudinaryImg,
      audio: cloudinaryAudio
    });
    await this.trackEntity.save(trackSave);
    return {
      success: true,
      message: httpMessages.trackWasCreated,
      status: HttpStatus.OK
    };
  }

  async getAll({ userId }) {
    return await this.trackEntity.find({ where: { userId } });
  }

  async deleteTrack(id, userId) {
    const track = await this.trackEntity.findOne({
      where: { id: Number(id) }
    });
    if (!track) {
      return new HttpException(httpMessages.trackIsNotFound, HttpStatus.BAD_REQUEST);
    }
    await this.trackEntity.delete(track.id);
    return {
      success: true,
      status: HttpStatus.OK,
      message: httpMessages.trackDeleted
    };
  }
}
