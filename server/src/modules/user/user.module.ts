import { forwardRef, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderTracksEntity } from '../../db/entity/orderTracks.entity';
import { TrackEntity } from '../../db/entity/track.entity';
import { UserEntity } from '../../db/entity/user.entity';
import { EmailModule } from '../email/email.module';
import { JwtConfig } from './jwtAuth/jwt.config';
import { JwtAuthGuard } from './jwtAuth/JwtAuth.guard';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, OrderTracksEntity, TrackEntity]),
    PassportModule,
    ConfigModule,
    JwtModule.registerAsync(new JwtConfig()),
    forwardRef(() => EmailModule)
  ],
  providers: [UserService, JwtAuthGuard],
  controllers: [UserController],
  exports: [PassportModule, JwtModule, UserService]
})
export class UserModule {}
