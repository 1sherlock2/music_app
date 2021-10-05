import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import httpMessages from 'src/utils/httpMessages';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private jwtServise: JwtService) {}
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();

    try {
      const authHeader = req.headers.authorization;
      const [bearer, token] = authHeader.split(' ');
      if (bearer !== 'Bearer' && !token) {
        return true
      }
      const user = this.jwtServise.verify(token);
      req.userId = user;
      return true;
    } catch (e) {
      throw new UnauthorizedException(httpMessages.userIsNotAuthorithation);
    }
  }
}
