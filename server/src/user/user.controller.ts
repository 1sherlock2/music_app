import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Request,
  UseGuards
} from '@nestjs/common';
import { AddRoleDTO, LoginDTO, UserCreateDTO } from 'src/user/dto/user.dto';
import { IRegistrationStatus } from 'src/interfaces/user.register_status.interface';
import { UserService } from './user.service';
import { errorMessage } from 'src/utils/httpErrorObject';
import { JwtAuthGuard } from './jwtAuth/JwtAuth.guard';
import { RolesGuard } from 'src/roles/roles.guard';
import { Roles } from 'src/roles/roles.decorator';
import { RoleEnum } from 'src/enums/role.enum';
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async register(
    @Body() createUserDto: UserCreateDTO
  ): Promise<IRegistrationStatus> {
    try {
      return await this.userService.create(createUserDto);
    } catch (e) {
      return errorMessage(false, HttpStatus.INTERNAL_SERVER_ERROR, e);
    }
  }

  @Post('login')
  async login(@Body() loginService: LoginDTO) {
    try {
      return await this.userService.authenticate(loginService);
    } catch (e) {
      return errorMessage(false, HttpStatus.INTERNAL_SERVER_ERROR, e);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('check')
  getProfile(@Request() req) {
    if (!req.user?.id) {
      return { success: false };
    }
    return { success: true, userId: req.user.id };
  }

  @Roles(RoleEnum.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('add_role')
  async addRole(@Body() { userId, role }: AddRoleDTO) {
    return await this.userService.addRole({ userId, role });
  }

  @Roles(RoleEnum.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('ban_user')
  async banUser(@Body() { userId }: { userId: string }) {
    return await this.userService.ban(userId);
  }
}
