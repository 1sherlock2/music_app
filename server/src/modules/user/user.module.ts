import { forwardRef, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderTracks } from '../../db/entity/orderTracks.entity';
import { Track } from '../../db/entity/track.entity';
import { User } from '../../db/entity/user.entity';
import { EmailModule } from '../email/email.module';
import { JwtConfig } from './jwtAuth/jwt.config';
import { JwtAuthGuard } from './jwtAuth/JwtAuth.guard';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, OrderTracks, Track]),
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
