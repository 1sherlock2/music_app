import { Injectable } from '@nestjs/common';
import { UploadApiResponse, UploadApiErrorResponse } from 'cloudinary';
import { v2 } from 'cloudinary';
import * as fs from 'fs';
import * as fileFormats from 'file-formats';
import * as path from 'path';
import { IUploadStatus } from 'src/interfaces/track.interface';

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
        resource_type: isAudioFormat ? 'video' : undefined
      }));

    if (!result) {
      fs.unlinkSync(filePath);
      return {
        success: false,
        message: result.message
      };
    }
    fs.unlinkSync(filePath);
    const { url } = result;
    return {
      success: true,
      [`${isAudioFormat ? 'urlAudio' : 'urlImg'}`]: url
    };
  }
  async urlStream(audioUrl) {
    const splitUrl = audioUrl.split('/');
    const audioName = splitUrl[splitUrl.length - 1];
    const formatAudio = fileFormats.list().find((el) => {
      const formatFromName = audioName.split('.')[1];
      return el === `.${formatFromName}`;
    });
    const regExpFormatAudio = formatAudio && new RegExp(`${formatAudio}`);
    const audioUrlPublicId = splitUrl[splitUrl.length - 1].replace(
      regExpFormatAudio,
      ''
    );
    splitUrl.pop();
    const audioUrlNotification = splitUrl.join('/');
    const uploadOptions = {
      resourse_type: 'video',
      eager: [
        {
          // streaming_profile: 'full_hd',
          streaming_profile: 'hd',
          format: 'mp4'
          // format: 'm3u8'
        }
      ],
      // eager_async: true,
      // eager_notification_url: audioUrlNotification,
      // 'http://res.cloudinary.com/drypohi9s/video/upload/v1634301118/music_app/audio',
      public_id: audioUrlPublicId
    };

    // v2.uploader.upload(audioUrl, uploadOptions, (result) =>
    //   console.log('d3f3skenivcmhhc4q6mm', result)
    // );
    const aaa = v2.url(audioName, { resource_type: 'video' });
  }
}
// https://res.cloudinary.com/drypohi9s/video/upload/v1629745763/
// http://res.cloudinary.com/diytstqfb/video/upload/v1638117155/music_app/audio/ylprlvm1gftkzdriribm.mp3
