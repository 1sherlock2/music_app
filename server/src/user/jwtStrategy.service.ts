import { UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import httpMessages from 'src/utils/httpMessages';
import { IJwtValidate } from './dto/jwtStrategy.dto';
import { UserService } from './user.service';

export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.SECRET_KEY,
      algorithms: 'RS256'
    });
  }
  // async validate(payLoad: IJwtValidate) {
  //   const userWithPayload = await this.userService.validateUserByPayload(payLoad);
  //   if (!userWithPayload) throw new UnauthorizedException(httpMessages.invalidToken);
  //   return userWithPayload;
  // }
}
