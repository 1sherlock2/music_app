import { Injectable } from '@nestjs/common';
import { UploadApiResponse, UploadApiErrorResponse } from 'cloudinary';
import { v2 } from 'cloudinary';
import { Readable } from 'stream';
import * as fs from 'fs';
import * as fileFormats from 'file-formats';
import * as path from 'path';

@Injectable()
export class CloudinaryService {
  async uploadImage(filePath: string, folder?: string): Promise<any> {
    // const formatFile = filePath.split('.').pop();
    const formatFile = path.extname(filePath);
    const arrayAudioFormat = fileFormats.list();
    const isAudioFormat = arrayAudioFormat.some((el) => el === formatFile);
    return v2.uploader
      .upload(filePath, {
        folder: `${folder}/${isAudioFormat ? 'audio' : 'img'}`,
        overwrite: true,
        resource_type: isAudioFormat ? 'video' : undefined
      })
      .then((result) => {
        fs.unlinkSync(filePath);
        return {
          success: true,
          url: result.url
        };
      })
      .catch((e) => {
        fs.unlinkSync(filePath);
        return {
          success: false,
          message: e.message
        };
      });
  }
}
// https://res.cloudinary.com/drypohi9s/video/upload/v1629745763/
