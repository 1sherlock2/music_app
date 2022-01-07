import { Injectable } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Injectable()
export class JwtConfig {
  imports: typeof ConfigModule[];
  useFactory: () => Promise<{ secret: string }>;
  inject: typeof ConfigService[];
  constructor() {
    this.imports = [ConfigModule];
    this.useFactory = async () => ({
      secret: process.env.SECRET_KEY
    });
    this.inject = [ConfigService];
  }
}
