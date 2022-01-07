import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { RoleEnum } from 'src/enums/role.enum';
import { JwtAuthGuard } from 'src/user/jwtAuth/JwtAuth.guard';
import { CreateRoleDto } from './dto/roles.dto';
import { Roles } from './roles.decorator';
import { RolesGuard } from './roles.guard';
import { RolesService } from './roles.service';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Roles(RoleEnum.Admin)
  @UseGuards(RolesGuard, JwtAuthGuard)
  @Post()
  async create(@Body() dto: CreateRoleDto) {
    return await this.rolesService.createRole(dto);
  }
}
