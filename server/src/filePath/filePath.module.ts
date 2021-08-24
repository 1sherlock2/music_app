import { Module } from '@nestjs/common';
import { FilePathService } from './filePath.service';

@Module({
  providers: [FilePathService],
  exports: [FilePathService]
})
export class FilePathModule {}
