import { NestFactory } from '@nestjs/core';
import { IndexModule } from './index.module';
import { SwaggerModule } from '@nestjs/swagger';
import { join } from 'path';
import * as https from 'https';
import * as http from 'http';
import documentationConfig from '../documentation/config';
import * as express from 'express';
import { ExpressAdapter } from '@nestjs/platform-express';

import { readFileSync } from 'fs';

const start = async () => {
  const ports = {
    http: process.env.HTTP_PORT || 7000,
    https: process.env.HTTPS_PORT || 4000,
  };

  const httpsOptions = {
    key: readFileSync(
      join(__dirname, '../secrets/CA/localhost/localhost.decrypted.key')
    ),
    cert: readFileSync(
      join(__dirname, '../secrets/CA/localhost/localhost.crt')
    ),
  };
  try {
    const server = express();
    const app = await NestFactory.create(
      IndexModule,
      new ExpressAdapter(server)
    );

    // documentation
    const document = SwaggerModule.createDocument(app, documentationConfig);
    SwaggerModule.setup('api', app, document);

    app.enableCors();
    await app.init();
    http.createServer(server).listen(ports.http, () => {
      console.log(`https server was started on ${ports.http}`);
    });
    console.log(server);
    https
      .createServer(httpsOptions, () => server)
      .listen(ports.https, () => {
        console.log(`https server was started on ${ports.https}`);
      });
  } catch (e) {
    console.log(e);
  }
};

start();
