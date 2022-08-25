import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Request,
  UseGuards
} from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from './jwtAuth/JwtAuth.guard';
import {
  AddRoleDTO,
  ChangePassDTO,
  LoginDTO,
  UserCreateDTO
} from './dto/user.dto';
import { IRegistrationStatus } from '../../interfaces/user.register_status.interface';
import { errorMessage } from '../../utils/httpErrorObject';
import { Roles } from '../../roles/roles.decorator';
import { RoleEnum } from '../../enums/role.enum';
import { RolesGuard } from '../../roles/roles.guard';
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

  @Post('change_pass')
  async change_password(@Body() changePassDTO: ChangePassDTO) {
    return await this.userService.changePass(changePassDTO);
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
