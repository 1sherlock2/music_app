import {
  Body,
  Controller,
  Delete,
  Get,
  ParseIntPipe,
  Post,
  Query,
  Req,
  UploadedFiles,
  UseGuards,
  UseInterceptors
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { IRecieveTrack } from 'src/interfaces/track.interface';
import { JwtAuthGuard } from 'src/user/jwtAuth/JwtAuth.guard';
import { TrackCreateDTO, UserId } from './dto/trackCreate.dto';
import { TrackService } from './track.service';

@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  getAllTrack(@Req() req) {
    const {
      user: { id }
    }: UserId = req;
    return this.trackService.getAll({ userId: id });
  }

  @UseGuards(JwtAuthGuard)
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
    @Req() req: UserId
  ) {
    const {
      user: { id }
    } = req;
    const { audio, img } = files;
    return this.trackService.create({
      ...otherProperty,
      userId: id,
      img: img && img[0],
      audio: audio && audio[0]
    });
  }

  @UseGuards(JwtAuthGuard)
  @Delete('delete')
  deleteTrack(@Query('id', ParseIntPipe) id: number, @Req() req) {
    const { userId } = req;
    return this.trackService.deleteTrack(id, userId);
  }

  @UseGuards(JwtAuthGuard)
  @Post('url')
  getUrlStream(@Body() otherProperty: { trackId: number }) {
    const { trackId } = otherProperty;
    const result = this.trackService.getUrlStream(trackId);
    return result;
  }

  @UseGuards(JwtAuthGuard)
  @Post('updatePos')
  updateOrderPosTraks(@Body() otherProperty: { order: number[] }, @Req() req) {
    const { userId } = req;
    const { order } = otherProperty;
    const updatedOrder = this.trackService.updateOrderTracks({ order, userId });
  }
}
