import { Injectable } from '@nestjs/common';
import { UploadApiResponse, UploadApiErrorResponse } from 'cloudinary';
import { v2 } from 'cloudinary';
import { Readable } from 'stream';
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
    const { url, is_audio } = result;
    return {
      success: true,
      urlImg: !is_audio && url,
      urlAudio: is_audio && result.url
    };
  }
}
// https://res.cloudinary.com/drypohi9s/video/upload/v1629745763/
