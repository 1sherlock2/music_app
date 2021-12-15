import { Injectable } from '@nestjs/common';
import * as uuid from 'uuid';
import * as path from 'path';
import * as fs from 'fs';

@Injectable()
export class FilePathService {
  create(file) {
    try {
      const fileFormat = file?.originalname.split('.').pop();
      const fileName = `${uuid.v4()}.${fileFormat}`;
      const filePath = path.resolve(__dirname, '../..', 'assets');
      if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath, { recursive: true });
      }
      const fileExistion: string = path.resolve(filePath, fileName);
      fs.writeFileSync(fileExistion, Buffer.from(new Uint8Array(file.buffer)));
      return fileExistion;
    } catch (e) {
      console.log(e);
    }
  }
  createFileStream(data: string): string {
    const fileFormat = data.split('.').pop().replace(/\n/g, '');
    const fileName = `${uuid.v4()}.${fileFormat}`;
    const filePath = path.resolve(__dirname, '../..', 'assets', 'audio');
    if (!fs.existsSync(filePath)) {
      fs.mkdirSync(filePath, { recursive: true });
    }
    const fileExistion: string = path.resolve(filePath, fileName);
    fs.writeFileSync(fileExistion, data);
    return fileExistion;
  }
}
