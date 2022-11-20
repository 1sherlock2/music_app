import { Injectable } from '@nestjs/common';
import Piscina from 'piscina';
import * as path from 'path';

@Injectable()
export class WorkerPool {
  private pool: Piscina;
  constructor() {
    this.pool = new Piscina({
      filename: path.resolve(__dirname, 'modules/track/utils/downloadByUrl.js')
    });
  }

  public async run(...params) {
    await this.pool.run(params);
  }
}

// constructor(name) {
//   console.log({ Piscina });
//   this.pool = new Piscina({ filename: path.resolve(__dirname, name) });
// }
