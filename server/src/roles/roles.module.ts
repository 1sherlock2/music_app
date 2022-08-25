import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from 'src/db/entity/roles/roles.entity';
import { User } from 'src/db/entity/user.entity';
import { JwtConfig } from 'src/modules/user/jwtAuth/jwt.config';
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
