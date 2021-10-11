import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  Req,
  UploadedFiles,
  UseGuards,
  UseInterceptors
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { IRecieveTrack } from 'src/interfaces/track.interface';
import { JwtAuthGuard } from 'src/user/JwtAuth.guard';
import { TrackCreateDTO } from './dto/trackCreate.dto';
import { TrackService } from './track.service';

@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  getAllTrack(@Req() req) {
    const { userId } = req;
    return this.trackService.getAll({ userId });
  }

  @UseGuards(JwtAuthGuard)
  @Post('add')
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'audio', maxCount: 1 },
      { name: 'img', maxCount: 1 }
    ])
  )
  recieveTrack(
    @UploadedFiles() files: IRecieveTrack,
    @Body() otherProperty: TrackCreateDTO,
    @Req() req
  ) {
    const { userId } = req;
    const { audio, img } = files;
    return this.trackService.create({
      ...otherProperty,
      userId,
      img: img && img[0],
      audio: audio && audio[0]
    });
  }

  @UseGuards(JwtAuthGuard)
  @Delete('delete')
  deleteTrack(@Query('id') id: string, @Req() req) {
    const { userId } = req;
    return this.trackService.deleteTrack(id, userId);
  }
}
