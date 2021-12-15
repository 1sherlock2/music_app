import { Injectable } from '@nestjs/common';
import { UploadApiResponse, UploadApiErrorResponse } from 'cloudinary';
import { v2 } from 'cloudinary';
import * as fs from 'fs';
import * as fileFormats from 'file-formats';
import * as path from 'path';
import { IUploadStatus } from 'src/interfaces/track.interface';

const streamProfile = [
  { streaming_profile: 'full_hd', format: 'm3u8' },
  { streaming_profile: 'hd', format: 'm3u8' }
];
@Injectable()
export class CloudinaryService {
  async uploadFile(filePath: string, folder?: string): Promise<IUploadStatus> {
    const formatFile = filePath && path.extname(filePath);
    const isAudioFormat = fileFormats.list().some((el) => el === formatFile);

    const result =
      filePath &&
      (await v2.uploader.upload(filePath, {
        folder: `${folder}/${isAudioFormat ? 'audio' : 'img'}`,
        overwrite: true,
        eager: isAudioFormat && streamProfile,
        eager_async: true,
        resource_type: isAudioFormat && 'video'
      }));

    if (!result) {
      fs.unlinkSync(filePath);
      return {
        success: false,
        message: result.message
      };
    }

    fs.unlinkSync(filePath);
    const { url, eager } = result;
    return {
      success: true,
      eager,
      [`${isAudioFormat ? 'urlAudio' : 'urlImg'}`]: url
    };
  }
  async urlStream(urlByStream) {
    try {
      // return await v2.url(urlByStream, streamProfile);
      return await v2.video(urlByStream, streamProfile);
    } catch (e) {
      throw new Error(e);
    }
  }
}
// https://res.cloudinary.com/drypohi9s/video/upload/v1629745763/
// http://res.cloudinary.com/diytstqfb/video/upload/v1638117155/music_app/audio/ylprlvm1gftkzdriribm.mp3
// result: Error: ENOENT: no such file or directory, open 'dea6xnadikklwg9bhh8a.mp3'
