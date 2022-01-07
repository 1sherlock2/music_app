import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderTracks } from 'src/db/entity/orderTracks.entity';
import { Track } from 'src/db/entity/track.entity';
import { User } from 'src/db/entity/user.entity';
import { JwtConfig } from './jwtAuth/jwt.config';
import { JwtAuthGuard } from './jwtAuth/JwtAuth.guard';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, OrderTracks, Track]),
    PassportModule,
    JwtModule.registerAsync(new JwtConfig())
  ],
  providers: [UserService, JwtAuthGuard],
  controllers: [UserController],
  exports: [PassportModule, JwtModule]
})
export class UserModule {}
