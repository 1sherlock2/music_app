import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Request,
  UseGuards
} from '@nestjs/common';
import { UserCreateDTO } from 'src/user/dto/userCreate.dto';
import { IRegistrationStatus } from 'src/interfaces/user.register_status.interface';
import { UserService } from './user.service';
import { LoginDTO } from './dto/login.dto';
import { errorMessage } from 'src/utils/httpErrorObject';
import { JwtAuthGuard } from './jwtAuth/JwtAuth.guard';
@Controller('auth')
export class UserController {
  constructor(private readonly userService: UserService) {}

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
      return await this.userService.authenticate(loginService);
    } catch (e) {
      return errorMessage(false, HttpStatus.INTERNAL_SERVER_ERROR, e);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('check')
  getProfile(@Request() req) {
    const userId = req.userId;
    if (!userId) {
      return { success: false };
    }
    return { success: true, userId: req.userId };
  }
}
