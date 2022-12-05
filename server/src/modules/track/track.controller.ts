import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  ParseIntPipe,
  Post,
  Query,
  UploadedFiles,
  UseGuards,
  UseInterceptors
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { UserId } from '../../decorators/userId.decorator';
import { JwtAuthGuard } from '../user/jwtAuth/JwtAuth.guard';
import {
  IUserId,
  TrackCreateDTO,
  UploadFileByLinkDTO
} from './dto/trackCreate.dto';
import { TrackService } from './track.service';
import { IRecieveTrack } from './interfaces/track.interface';

@Controller('track')
@UseGuards(JwtAuthGuard)
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Get()
  getAllTrack(@UserId() { userId }: IUserId) {
    return this.trackService.getAll({ userId });
  }

  @Get('count')
  getCount(@UserId() { userId }: IUserId) {
    return this.trackService.getCount({ userId });
  }

  @Post('add')
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'audio', maxCount: 1 },
      { name: 'img', maxCount: 1 }
    ])
  )
  createTrack(
    @UploadedFiles() files: IRecieveTrack,
    @Body() otherProperty: TrackCreateDTO,
    @UserId() { userId }: IUserId
  ) {
    const { audio, img } = files;
    return this.trackService.create({
      ...otherProperty,
      userId,
      img: img && img[0],
      audio: audio && audio[0]
    });
  }

  @Delete('delete')
  deleteTrack(
    @Query('id', ParseIntPipe) id: number,
    @UserId() userId: IUserId
  ) {
    return this.trackService.deleteTrack(id, userId);
  }

  @Post('url')
  getUrlStream(@Body() otherProperty: { trackId: number }) {
    const { trackId } = otherProperty;
    return this.trackService.getUrlStream(trackId);
  }

  @Post('updatePos')
  updateOrderPosTraks(
    @Body() otherProperty: { order: number[] },
    @UserId() userId: IUserId
  ) {
    const { order } = otherProperty;
    this.trackService.updateOrderTracks({ order, userId });
  }

  @Post('download')
  @HttpCode(200)
  downloadAudio(@Body() otherProperty: { urlSrc: string }) {
    return this.trackService.downloadAudio(otherProperty);
  }

  @Post('upload_file')
  @HttpCode(200)
  uploadFile(
    @Body() otherProperty: UploadFileByLinkDTO,
    @UserId() userId: IUserId
  ) {
    return this.trackService.uploadFileByLink({ ...otherProperty, ...userId });
  }
}
