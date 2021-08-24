import { Injectable } from '@nestjs/common';
import { UploadApiResponse, UploadApiErrorResponse } from 'cloudinary';
import { v2 } from 'cloudinary';
import { Readable } from 'stream';
import * as fs from 'fs';
@Injectable()
export class CloudinaryService {
  async uploadImage(filePath: string, folder?: string): Promise<any> {
    return v2.uploader
      .upload(filePath, {
        folder: `${folder}/`,
        overwrite: true
      })
      .then((result) => {
        fs.unlinkSync(filePath);
        console.log(result.url);
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
