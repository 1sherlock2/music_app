import { DocumentBuilder } from '@nestjs/swagger';

const config = new DocumentBuilder()
  .setTitle('Music app documentation')
  .setDescription('The music app API description')
  .setVersion('1.0')
  .addTag('cats')
  .build();

export default config;