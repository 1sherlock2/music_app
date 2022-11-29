import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtConfig } from '../user/jwtAuth/jwt.config';
import { EmailService } from './email.service';

@Module({
  imports: [
    ConfigModule,
    JwtModule.registerAsync(new JwtConfig()),
    PassportModule
  ],
  providers: [EmailService],
  exports: [EmailService]
})
export class EmailModule {}
