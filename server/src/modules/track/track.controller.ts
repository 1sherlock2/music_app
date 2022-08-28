import {
  Body,
  Controller,
  Delete,
  Get,
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
import { IUserId, TrackCreateDTO } from './dto/trackCreate.dto';
import { TrackService } from './track.service';
import { IRecieveTrack } from './utils/track.interface';

@Controller('track')
@UseGuards(JwtAuthGuard)
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Get()
  getAllTrack(@UserId() { userId }: IUserId) {
    return this.trackService.getAll({ userId });
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
    const updatedOrder = this.trackService.updateOrderTracks({ order, userId });
  }
}
