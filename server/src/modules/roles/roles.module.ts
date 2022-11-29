import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from '../../db/entity/roles/roles.entity';
import { User } from '../../db/entity/user.entity';
import { JwtConfig } from '../user/jwtAuth/jwt.config';
import { RolesController } from './roles.controller';
import { RolesService } from './roles.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Role, User]),
    JwtModule.registerAsync(new JwtConfig())
  ],
  providers: [RolesService],
  controllers: [RolesController]
})
export class RolesModule {}
