import {
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NotFoundException
} from '@nestjs/common';
import * as uuid from 'uuid';
import * as path from 'path';
import * as fs from 'fs';
import * as fileFormats from 'file-formats';
import nodeFetch from 'node-fetch';

@Injectable()
export class FilePathService {
  create(file: Express.Multer.File, name?: string) {
    try {
      const fileFormat = file?.originalname.split('.').pop();
      const fileName = `${name}_${uuid.v4()}.${fileFormat}`;
      const filePath = path.resolve(__dirname, '../..', 'assets');
      if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath, { recursive: true });
      }
      const fileExistion: string = path.resolve(filePath, fileName);
      fs.writeFileSync(fileExistion, Buffer.from(new Uint8Array(file.buffer)));
      return fileExistion;
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  createFileStream(data: string): string {
    try {
      const fileFormat = data.split('.').pop().replace(/\n/g, '');
      const fileName = `${uuid.v4()}.${fileFormat}`;
      const filePath = path.resolve(__dirname, '../..', 'assets', 'audio');
      if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath, { recursive: true });
      }
      const fileExistion: string = path.resolve(filePath, fileName);
      fs.writeFileSync(fileExistion, data);
      return fileExistion;
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  downloadByUrl(url: string | undefined, name?: string, ext?: string) {
    return new Promise((resolve, reject) => {
      if (!url) {
        reject(new Error('Url path is not found'));
        return;
      }
      const audioExtentions = fileFormats.list();
      audioExtentions.push('.m4a');
      const isAudioFormat = audioExtentions.some((el) => el === `.${ext}`);
      nodeFetch(url)
        .then((responseFile) => {
          if (!responseFile.ok) {
            reject(
              new HttpException(
                {
                  error: `Error by query: ${responseFile.url}`,
                  message: false
                },
                HttpStatus.NOT_FOUND
              )
            );
          }

          const passStream = responseFile.body; // PassThrough;
          const fileName = `${name || ''}_${uuid.v4()}.${
            isAudioFormat ? ext : 'jpg'
          }`;
          const assetsPath = path.resolve(__dirname, '../..', 'assets');
          if (!fs.existsSync(assetsPath)) fs.mkdirSync(assetsPath);

          const filePath = path.resolve(__dirname, '../..', 'assets', fileName);
          passStream.on('data', (chunk) => {
            fs.appendFileSync(filePath, chunk, { encoding: 'latin1' });
            console.log(`Received ${chunk.length} bytes of data.`);
          });
          passStream.on('end', () => {
            console.log('END');
            resolve(filePath);
          });

          passStream.on('error', (err) => reject(err));
        })
        .catch((e) => {
          throw new NotFoundException(e);
        });
    });
  }
}
