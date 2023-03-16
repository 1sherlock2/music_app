import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  IUserId,
  UpdateOrderTracks,
  UploadFileByLinkDTO
} from './dto/trackCreate.dto';
import updateQueryForOrder from './utils/updateQueryForOrder';
import {
  IDownloadAudioProps,
  IDownloadByLink,
  IDownloadResult,
  ITrackCreate,
  ITrackCreateStatus
} from './interfaces/track.interface';
import { OrderTracksEntity } from '../../db/entity/orderTracks.entity';
import { TrackEntity } from '../../db/entity/track.entity';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { FilePathService } from '../../filePath/filePath.service';
import httpMessages from '../../utils/httpMessages';
import { UserEntity } from '../../db/entity/user.entity';
import optionsDownload from './utils/optionsDownload';
import nodeFetch from 'node-fetch';
import objectResultCloud from '../../utils/objectResultCloud';
import { WorkerPool } from '../../workerPool';
@Injectable()
export class TrackService {
  constructor(
    @InjectRepository(TrackEntity)
    private readonly trackEntity: Repository<TrackEntity>,
    @InjectRepository(OrderTracksEntity)
    private readonly orderTraks: Repository<OrderTracksEntity>,
    @InjectRepository(UserEntity)
    private readonly userEntity: Repository<UserEntity>,
    private readonly cloudinaryService: CloudinaryService,
    private readonly filePathService: FilePathService,
    // @Inject(new WorkerPool('./utils/downloadByUrl.ts'))
    // private readonly workerPool
    private readonly workerPool: WorkerPool
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
    const objectResult = objectResultCloud(resUploadFiles);
    const { cloudinaryImg, cloudinaryAudio } = objectResult;
    if (!userId) {
      throw new HttpException(
        httpMessages.userIsNotAuthorithation,
        HttpStatus.BAD_GATEWAY
      );
    }
    const user = await this.userEntity.findOne({ where: { id: userId } });

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
      where: { user: { id: userId } },
      relations: { user: true }
    });
    const modifyOrder = [id, ...order];
    // this.orderTraks.update()
    await updateQueryForOrder(OrderTracksEntity, modifyOrder, userId);
    return {
      success: true,
      message: httpMessages.trackWasCreated,
      status: HttpStatus.OK
    };
  }

  async getAll({ userId }: IUserId) {
    const tracks = await this.trackEntity.find({
      where: { user: { id: userId } },
      relations: { user: true }
    });
    const tracksOrder = await this.orderTraks.findOne({
      where: { user: { id: userId } },
      relations: { user: true }
    });
    if (!tracksOrder?.order.length) {
      return;
    }
    let { order } = tracksOrder;
    const collectionIdTrack: number[] = tracks.map((el) => el.id);
    if (!order.length) {
      await updateQueryForOrder(OrderTracksEntity, collectionIdTrack, userId);
    }
    const excludeTracksId = collectionIdTrack.filter(
      (orderId) => !order.includes(orderId)
    );
    if (excludeTracksId) {
      order = [...excludeTracksId.reverse(), ...order];
    }

    const trackObject = tracks.reduce((acc, el) => {
      acc = { ...acc, [el.id]: el };
      return acc;
    }, {});
    return order.map((el) => trackObject[el]).filter(Boolean);
  }

  async getCount({ userId }: IUserId) {
    const result = await this.trackEntity.query(
      `SELECT COUNT(*) FROM track WHERE "userId"=${userId}`
    );
    const { count } = result[0];
    if (isNaN(Number(count))) {
      throw new BadRequestException();
    }
    return Number(count);
  }

  async deleteTrack(id: number, userId: IUserId) {
    const track = await this.trackEntity.findOne({
      where: { id, user: { id: userId } },
      relations: { user: true }
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
      const { audio } = await this.trackEntity.findOne({ where: { id } });
      return await this.cloudinaryService.urlStream(audio);
    } catch (e) {
      console.log(e);
    }
  }

  async updateOrderTracks({ order, userId }: UpdateOrderTracks) {
    try {
      if (order.length) {
        await updateQueryForOrder(OrderTracksEntity, order, userId.userId);
      }
    } catch (e) {
      console.log(e);
    }
  }

  async downloadAudio({
    urlSrc
  }: IDownloadAudioProps): Promise<IDownloadResult> {
    try {
      const response = await nodeFetch(
        'https://ssyoutube.com/api/convert',
        optionsDownload(urlSrc)
      );
      const responseJSON: IDownloadByLink = await response.json();
      const {
        id,
        url,
        thumb: thumbnail,
        meta: { duration, title }
      } = responseJSON;
      if (!url.length) {
        throw new NotFoundException(httpMessages.contentIsNotFound);
      }

      const modifyUrls = url.filter(
        (item) => !!item.audio && item.ext === 'm4a'
      );
      return { id, title, thumbnail, duration, url: modifyUrls };
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  async uploadFileByLink({
    url: audioUrl,
    image: imageUrl,
    ext,
    artist,
    name,
    userId
  }: InstanceType<typeof UploadFileByLinkDTO> & InstanceType<typeof IUserId>) {
    let audioPath;
    let imgPath;
    try {
      // audioPath = await this.workerPool.run(audioUrl, name, ext);
      // imgPath = await this.workerPool.run(imageUrl);
      audioPath = await this.filePathService.downloadByUrl(audioUrl, name, ext);
      imgPath = await this.filePathService.downloadByUrl(imageUrl);
    } catch (e) {
      throw new NotFoundException(e);
    }

    const multipleUpload = [audioPath, imgPath]
      .filter(Boolean)
      .map((path: string) => {
        return this.cloudinaryService.uploadFile(path, process.env.FOLDER_NAME);
      });
    const resUploadFiles = await Promise.all(multipleUpload);
    const objectResult = objectResultCloud(resUploadFiles);
    const { cloudinaryImg, cloudinaryAudio } = objectResult;
    const user = await this.userEntity.findOne({ where: { id: userId } });
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
      where: { user: { id: userId } },
      relations: { user: true }
    });
    const modifyOrder = [id, ...order];
    await updateQueryForOrder(OrderTracksEntity, modifyOrder, userId);

    return {
      success: true,
      message: httpMessages.trackWasCreated,
      status: HttpStatus.OK
    };
  }
}

// const url =
//   'https://rr4---sn-q4flrnes.googlevideo.com/videoplayback?expire=1663509970&ei=cdEmY4jCNuqX2_gPg-SU2Ao&ip=216.131.78.33&id=o-ADVDE1fvl0Fl2cngdygwOjiKKJPXYkyvQpsNydw2sG8Q&itag=140&source=youtube&requiressl=yes&mh=Ro&mm=31%2C26&mn=sn-q4flrnes%2Csn-vgqskns7&ms=au%2Conr&mv=m&mvi=4&pl=23&initcwndbps=2240000&spc=yR2vp124v5dqlQ16cwmYBd4NdEFiEg4&vprv=1&mime=audio%2Fmp4&ns=tTA0g-WKDQMVVNPEstUaRgMI&gir=yes&clen=1936355&dur=119.605&lmt=1577654071475784&mt=1663488060&fvip=5&keepalive=yes&fexp=24001373%2C24007246&c=WEB&rbqsm=fr&txp=5531432&n=cvpgQ9fESWE8JQ&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cspc%2Cvprv%2Cmime%2Cns%2Cgir%2Cclen%2Cdur%2Clmt&sig=AOq0QJ8wRQIgIpuruZHAyPKdmFboDqdopOk0H9UAUfwJJ9FblJhkr4kCIQDEAUvSPI6e8h9juushlTP-ejDkf4-BCG1N_QXJ02YrbA%3D%3D&lsparams=mh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Cinitcwndbps&lsig=AG3C_xAwRQIhAPBnfHFITL50UX0XerRJfUd2TIHyPZNlyZwcnziRV4iiAiAcfL0JEFxrcdIjMz0zph3LfBZuERC_-_sYH2YtYioQ1A%3D%3D';
// const mp3Url =
//   'https://cdn02.ytapi.download/dl?hash=PqTymHRVLqNc2AfxVHxAv4ftYpJtOA6FJdki7YEa8EoyPEXFmQ7T%2B2RxrhiQVxLrAd47GhbIy3shKik0ie4YSYSItsQtedAPPR1eLU%2F6xT3B3kAGHVu7yYxmXF6gfW3vcSjsJfkIFxR9lT8bzmclOqMfKebWbSyCrUCfPDVzSoMf%2FKSBBf9RiLBPitOpRDOsZE2q7w55hZgPDcvl%2FjOCDw7q%2BaPZBJfUz8kwLZr7Wbymf%2F4LH7Get5qqQ8BoAt3z9V4BUGt0bIbg6ZY%2BYMMr1Un5OH80jiXz5eniEg3C6wGRneOHwxP4CCppC2TNLYUJxfLjMCPiGUfbn4%2FiTxjZmA%3D%3D';

// const m4a =
// 'https://rr4---sn-q4flrnes.googlevideo.com/videoplayback?expire=1663509970&ei=cdEmY4jCNuqX2_gPg-SU2Ao&ip=216.131.78.33&id=o-ADVDE1fvl0Fl2cngdygwOjiKKJPXYkyvQpsNydw2sG8Q&itag=140&source=youtube&requiressl=yes&mh=Ro&mm=31%2C26&mn=sn-q4flrnes%2Csn-vgqskns7&ms=au%2Conr&mv=m&mvi=4&pl=23&initcwndbps=2240000&spc=yR2vp124v5dqlQ16cwmYBd4NdEFiEg4&vprv=1&mime=audio%2Fmp4&ns=tTA0g-WKDQMVVNPEstUaRgMI&gir=yes&clen=1936355&dur=119.605&lmt=1577654071475784&mt=1663488060&fvip=5&keepalive=yes&fexp=24001373%2C24007246&c=WEB&rbqsm=fr&txp=5531432&n=cvpgQ9fESWE8JQ&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cspc%2Cvprv%2Cmime%2Cns%2Cgir%2Cclen%2Cdur%2Clmt&sig=AOq0QJ8wRQIgIpuruZHAyPKdmFboDqdopOk0H9UAUfwJJ9FblJhkr4kCIQDEAUvSPI6e8h9juushlTP-ejDkf4-BCG1N_QXJ02YrbA%3D%3D&lsparams=mh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Cinitcwndbps&lsig=AG3C_xAwRQIhAPBnfHFITL50UX0XerRJfUd2TIHyPZNlyZwcnziRV4iiAiAcfL0JEFxrcdIjMz0zph3LfBZuERC_-_sYH2YtYioQ1A%3D%3D';
// // const aaaa = this.httpService.get(m4a).subscribe((response) => {
// //   const bbb = response.data;
// //   const aad = 1;
// // });
