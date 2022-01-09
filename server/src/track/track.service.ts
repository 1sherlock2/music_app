import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { Track } from 'src/db/entity/track.entity';
import {
  IResultCloudinary,
  ITrackCreateStatus,
  IUploadStatus
} from 'src/interfaces/track.interface';
import httpMessages from 'src/utils/httpMessages';
import { Repository } from 'typeorm';
import { TrackCreateDTO, UpdateOrderTracks } from './dto/trackCreate.dto';
import { FilePathService } from 'src/filePath/filePath.service';
import { OrderTracks } from 'src/db/entity/orderTracks.entity';
import { User } from 'src/db/entity/user.entity';
import updateQueryForOrder from './utils/updateQueryForOrder';

@Injectable()
export class TrackService {
  constructor(
    @InjectRepository(Track)
    private readonly trackEntity: Repository<Track>,
    @InjectRepository(OrderTracks)
    private readonly orderTraks: Repository<OrderTracks>,
    @InjectRepository(User)
    private readonly userEntity: Repository<User>,
    private readonly cloudinaryService: CloudinaryService,
    private readonly filePathService: FilePathService // private httpService: HttpService
  ) {}
  async create(trackCreateDTO): Promise<ITrackCreateStatus> {
    const { name, artist, img, audio, userId } = trackCreateDTO;
    const imgPath: string = img && this.filePathService.create(img);
    const audioPath: string = audio && this.filePathService.create(audio);
    const arrayPath = [imgPath, audioPath].filter(Boolean);

    const multipleUpload = arrayPath.map((path) => {
      return this.cloudinaryService.uploadFile(path, process.env.FOLDER_NAME);
    });
    const resUploadFiles = await Promise.all(multipleUpload);
    const objectResult = resUploadFiles.reduce(
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
    if (!userId) {
      throw new HttpException(
        httpMessages.userIsNotAuthorithation,
        HttpStatus.BAD_GATEWAY
      );
    }
    const user = await this.userEntity.findOne(userId);

    const trackSave = await this.trackEntity.create({
      name,
      artist,
      img: cloudinaryImg,
      audio: cloudinaryAudio,
      user: user
    });
    await this.trackEntity.save(trackSave);
    return {
      success: true,
      message: httpMessages.trackWasCreated,
      status: HttpStatus.OK
    };
  }

  async getAll({ userId }: { userId: number }) {
    const tracks = await this.trackEntity.find({ where: { user: userId } });
    const tracksOrder = await this.orderTraks.findOne({
      where: { user: userId }
    });
    const { order } = tracksOrder;
    const collectionIdTrack: number[] = tracks.map((el) => el.id);
    if (!order.length) {
      await updateQueryForOrder(OrderTracks, collectionIdTrack, userId);
    }

    const trackObject = tracks.reduce((acc, el) => {
      acc = { ...acc, [el.id]: el };
      return acc;
    }, {});
    return order.map((el) => trackObject[el]);
  }

  async deleteTrack(id, userId) {
    const track = await this.trackEntity.findOne({
      where: { id, userId }
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
      return await this.cloudinaryService.urlStream(audio);
    } catch (e) {
      console.log(e);
    }
  }

  async updateOrderTracks({ order, userId }: UpdateOrderTracks) {
    try {
      if (order.length) {
        await updateQueryForOrder(OrderTracks, order, userId);
      }
    } catch (e) {
      console.log(e);
    }
  }
}
