import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import httpMessages from '../../../utils/httpMessages';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private jwtServise: JwtService) {}
  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();

    try {
      const authHeader = req.headers.authorization;
      const [bearer, token] = authHeader.split(' ');
      // if (!Boolean(token)) return false;
      if (bearer !== 'Bearer' && !token) {
        throw new UnauthorizedException(httpMessages.userIsNotAuthorithation);
      }
      const { id, roles } = this.jwtServise.verify(token);
      req.user = { id, roles };
      return true;
    } catch (e) {
      throw new UnauthorizedException(httpMessages.userIsNotAuthorithation);
    }
  }
}
