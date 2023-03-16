import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { UploadApiResponse, UploadApiErrorResponse } from 'cloudinary';
import { v2 } from 'cloudinary';
import * as fs from 'fs';
import * as fileFormats from 'file-formats';
import * as path from 'path';
import { IUploadStatus } from '../track/interfaces/track.interface';

const streamProfile = [
  { streaming_profile: 'full_hd', format: 'm3u8' },
  { streaming_profile: 'hd', format: 'm3u8' }
];
@Injectable()
export class CloudinaryService {
  async uploadFile(filePath: string, folder?: string): Promise<IUploadStatus> {
    try {
      const formatFile = filePath && path.extname(filePath);
      const audioExtentions = fileFormats.list();
      audioExtentions.push('.m4a');
      const isAudioFormat = audioExtentions.some((el) => el === formatFile);
      if (!filePath) {
        return { success: false };
      }

      const response: UploadApiResponse = await v2.uploader.upload(filePath, {
        folder: `${folder}/${isAudioFormat ? 'audio' : 'img'}`,
        overwrite: true,
        eager: isAudioFormat && streamProfile,
        eager_async: true,
        resource_type: isAudioFormat ? 'video' : 'image'
      });

      fs.unlinkSync(filePath);
      if (!response.public_id) {
        return { success: false };
      }

      return {
        success: true,
        [`${isAudioFormat ? 'audioHlsUrl' : 'imgUrl'}`]: isAudioFormat
          ? response.eager[0].url
          : response.url
      };
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }
  async urlStream(urlByStream) {
    try {
      return await v2.url(urlByStream, [
        { streaming_profile: 'hd_lean', resource_type: 'video' },
        { streaming_profile: 'full_hd_wifi', resource_type: 'video' }
      ]);
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }
}
// https://res.cloudinary.com/drypohi9s/video/upload/v1629745763/
// http://res.cloudinary.com/diytstqfb/video/upload/v1638117155/music_app/audio/ylprlvm1gftkzdriribm.mp3
// result: Error: ENOENT: no such file or directory, open 'dea6xnadikklwg9bhh8a.mp3'
