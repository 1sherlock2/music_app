import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import { join } from 'path';
import * as https from 'https';
import * as http from 'http';
import documentationConfig from '../documentation/config';
import express from 'express';
import { ExpressAdapter } from '@nestjs/platform-express';

import { readFileSync } from 'fs';
import { ValidationPipe } from '@nestjs/common';
import { IndexModule } from './modules/index.module';
import childProcess from 'child_process';
import path from 'path';
import findByPort from './utils/findByPort';
import { AuthExceptionFilter } from './exceptions/auth-exception.filter';

const start = async () => {
  const ports = {
    http: process.env.HTTP_PORT || 7000,
    https: process.env.HTTPS_PORT || 4000
  };

  // const httpsOptions = {
  //   key: readFileSync(
  //     join(__dirname, '../secrets/CA/localhost/localhost.decrypted.key')
  //   ),
  //   cert: readFileSync(join(__dirname, '../secrets/CA/localhost/localhost.crt'))
  // };
  try {
    const server = express();
    const app = await NestFactory.create(
      IndexModule,
      new ExpressAdapter(server)
    );

    // documentation
    const document = SwaggerModule.createDocument(app, documentationConfig);
    SwaggerModule.setup('api', app, document);

    app.useGlobalPipes(new ValidationPipe({ transform: true }));
    app.useGlobalFilters(new AuthExceptionFilter());
    app.enableCors();
    // await app.init();
    await app.listen(ports.http, () =>
      console.log(`http server was started on ${ports.http}`)
    );
    // await findByPort(7000);
    // http.createServer(server).listen(ports.http, () => {
    //   console.log(`http server was started on ${ports.http}`);
    // });
    // console.log(server);
    // https
    //   .createServer(httpsOptions, () => server)
    //   .listen(ports.https, () => {
    //     console.log(`https server was started on ${ports.https}`);
    //   });
  } catch (e) {
    console.log(e);
  }
};

start();
