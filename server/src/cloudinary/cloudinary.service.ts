import { Injectable } from '@nestjs/common';
import { UploadApiResponse, UploadApiErrorResponse } from 'cloudinary';
import { v2 } from 'cloudinary';
import toStream = require('buffer-to-stream');

@Injectable()
export class CloudinaryService {
  async uploadImage(file: Express.Multer.File): Promise<UploadApiResponse | UploadApiErrorResponse> {
    return new Promise((resolve, reject) => {
      const upload = v2.uploader.upload_stream((err, result) => {
        if (err) return reject(err);
        resolve(result);
      });
      toStream(file.buffer).pipe(upload);
    });
  }
}
// https://res.cloudinary.com/drypohi9s/video/upload/v1629745763/
