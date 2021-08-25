import { Body, Controller, Get, Post, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { FilePathService } from 'src/filePath/filePath.service';
import { IRecieveTrack } from 'src/interfaces/track.interface';
import { TrackCreateDTO } from './dto/trackCreate.dto';
import { TrackService } from './track.service';

@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Post('add')
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'audio', maxCount: 1 },
      { name: 'img', maxCount: 1 }
    ])
  )
  recieveTrack(@UploadedFiles() files: IRecieveTrack, @Body() otherProperty: TrackCreateDTO) {
    console.log('files', files); // undefined
    console.log('other', otherProperty);
    const { audio, img } = files;
    return this.trackService.create({ ...otherProperty, img: img && img[0], audio: audio && audio[0] });
  }
}
