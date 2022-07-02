import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IUserId, UpdateOrderTracks } from './dto/trackCreate.dto';
import { User } from 'src/db/entity/user.entity';
import updateQueryForOrder from './utils/updateQueryForOrder';
import {
  IResultCloudinary,
  ITrackCreate,
  ITrackCreateStatus,
  IUploadStatus
} from './utils/track.interface';
import { OrderTracks } from '../db/entity/orderTracks.entity';
import { Track } from '../db/entity/track.entity';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { FilePathService } from '../filePath/filePath.service';
import httpMessages from '../utils/httpMessages';

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
  async create({
    name,
    artist,
    img,
    audio,
    userId
  }: ITrackCreate): Promise<ITrackCreateStatus> {
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

    // для обновления порядка последовательности треков
    const { id } = await this.trackEntity.findOne({
      where: { audio: cloudinaryAudio }
    });
    const { order } = await this.orderTraks.findOne({
      where: { user: userId }
    });
    const modifyOrder = [id, ...order];
    await updateQueryForOrder(OrderTracks, modifyOrder, userId);
    return {
      success: true,
      message: httpMessages.trackWasCreated,
      status: HttpStatus.OK
    };
  }

  async getAll({ userId }: IUserId) {
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
    const aaa = order.map((el) => trackObject[el]);
    return aaa;
  }

  async deleteTrack(id: number, userId: IUserId) {
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
        await updateQueryForOrder(OrderTracks, order, userId.userId);
      }
    } catch (e) {
      console.log(e);
    }
  }
}
