import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Request,
  UseGuards
} from '@nestjs/common';
import { Roles } from 'src/decorators/roles.decorator';
import { UserCreateDTO } from 'src/user/dto/userCreate.dto';
import { Role } from 'src/enums/role.enum';
import { IRegistrationStatus } from 'src/interfaces/user.register_status.interface';
import { UserService } from './user.service';
import { LoginDTO } from './dto/login.dto';
import { errorMessage } from 'src/utils/httpErrorObject';
import { JwtAuthGuard } from './JwtAuth.guard';
import { request } from 'express';

@Controller('auth')
export class UserController {
  constructor(private readonly userService: UserService) {}
  // @Roles(Role.Admin)
  @Post('register')
  public async register(
    @Body() createUserDto: UserCreateDTO
  ): Promise<IRegistrationStatus> {
    try {
      return await this.userService.create(createUserDto);
    } catch (e) {
      return errorMessage(false, HttpStatus.INTERNAL_SERVER_ERROR, e);
    }
  }
  @Post('login')
  public async login(@Body() loginService: LoginDTO, @Request() req) {
    try {
      console.log(req.user);
      return await this.userService.authenticate(loginService);
    } catch (e) {
      return errorMessage(false, HttpStatus.INTERNAL_SERVER_ERROR, e);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('check')
  getProfile(@Request() req) {
    return req.user;
  }
}
