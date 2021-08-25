import { Injectable } from '@nestjs/common';
import { UploadApiResponse, UploadApiErrorResponse } from 'cloudinary';
import { v2 } from 'cloudinary';
import { Readable } from 'stream';
import * as fs from 'fs';
import * as fileFormats from 'file-formats';
import * as path from 'path';

@Injectable()
export class CloudinaryService {
  uploadImage(filePath: string, folder?: string): Promise<any> {
    const formatFile = filePath && path.extname(filePath);
    const isAudioFormat = fileFormats.list().some((el) => el === formatFile);
    return (
      filePath &&
      v2.uploader
        .upload(filePath, {
          folder: `${folder}/${isAudioFormat ? 'audio' : 'img'}`,
          overwrite: true,
          resource_type: isAudioFormat ? 'video' : undefined
        })
        .then((result) => {
          fs.unlinkSync(filePath);
          return {
            success: true,
            urlImg: !isAudioFormat && result.url,
            urlAudio: isAudioFormat && result.url
          };
        })
        .catch((e) => {
          fs.unlinkSync(filePath);
          return {
            success: false,
            message: e.message
          };
        })
    );
  }
}
// https://res.cloudinary.com/drypohi9s/video/upload/v1629745763/
