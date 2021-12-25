import {
  HttpException,
  HttpStatus,
  Injectable,
  StreamableFile
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { Track } from 'src/db/entity/track.entity';
import * as fs from 'fs';
import * as path from 'path';
import {
  IResultCloudinary,
  ITrackCreateStatus,
  IUploadStatus,
  Todo,
  TrackRecieveParam
} from 'src/interfaces/track.interface';
import httpMessages from 'src/utils/httpMessages';
import { Repository } from 'typeorm';
import { TrackCreateDTO } from './dto/trackCreate.dto';
import { FilePathService } from 'src/filePath/filePath.service';
import { HttpModule, HttpService } from '@nestjs/axios';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AxiosResponse } from 'axios';
// import { HttpService } from '@nestjs/axios';

@Injectable()
export class TrackService {
  constructor(
    @InjectRepository(Track)
    private readonly trackEntity: Repository<Track>,
    private readonly cloudinaryService: CloudinaryService,
    private readonly filePathService: FilePathService,
    private httpService: HttpService
  ) {}
  async create(trackCreateDTO: TrackCreateDTO): Promise<ITrackCreateStatus> {
    const { name, artist, img, audio, userId } = trackCreateDTO;
    const imgPath: string = img && this.filePathService.create(img);
    const audioPath: string = audio && this.filePathService.create(audio);
    const arrayPath = [imgPath, audioPath].filter(Boolean);

    const multipleUpload = arrayPath.map((path) => {
      return this.cloudinaryService.uploadFile(path, process.env.FOLDER_NAME);
    });
    const resposeUploadFiles = await Promise.all(multipleUpload);
    const objectResult = resposeUploadFiles.reduce(
      (acc: IResultCloudinary, response: IUploadStatus) => {
        const { success, audioHlsUrl, imgUrl } = response;
        if (!success) {
          throw new HttpException(
            httpMessages.errorUpladAudioInCloud,
            HttpStatus.BAD_GATEWAY
          );
        }

        if (imgUrl) acc.cloudinaryImg = imgUrl;
        if (audioHlsUrl) acc.cloudinaryAudio = audioHlsUrl;
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

  // async recieve({
  //   id,
  //   audioUrl
  // }: TrackRecieveParam): Promise<StreamableFile | void> {
  //   const { data: audioFile } = await this.httpService
  //     .get(audioUrl)
  //     .toPromise();
  //   // const audioBuffer = Buffer.from(audioFile);
  //   const stream = new StreamableFile(audioFile).getStream();
  //   const buff = Buffer.from(audioFile, 'utf8');
  //   console.log('path', path.resolve('../server/assets/audio/track.mp3'));
  //   // const createStream = fs.createReadStream(path);
  //   // fs.writeFileSync(path.resolve('../server/assets/audio/track.mp3'), buff);
  //   // console.log('aaa', aaa);
  // }

  async deleteTrack(id, userId) {
    const track = await this.trackEntity.findOne({
      where: { id: Number(id), userId }
    });
    if (!track) {
      return new HttpException(
        httpMessages.trackIsNotFound,
        HttpStatus.BAD_REQUEST
      );
    }
    await this.trackEntity.delete(track.id);
    return {
      success: true,
      status: HttpStatus.OK,
      message: httpMessages.trackDeleted
    };
  }
  async getUrlStream(id) {
    try {
      const { audio } = await this.trackEntity.findOne({ id });
      const audioStream = await this.cloudinaryService.urlStream(audio);

      return audioStream;
    } catch (e) {
      console.log(e);
    }
  }
}
