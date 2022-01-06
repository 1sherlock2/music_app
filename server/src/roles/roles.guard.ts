import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/db/entity/user.entity';
import { RoleEnum } from 'src/enums/role.enum';
import httpMessages from 'src/utils/httpMessages';
import { Repository } from 'typeorm';
import { ROLES_KEY } from './roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector, private jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<RoleEnum[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()]
    );
    if (!requiredRoles) {
      return true;
    }
    const req = context.switchToHttp().getRequest();
    const {
      headers: { authorization }
    } = req;
    const [bearer, token] = authorization.split(' ');
    if (bearer !== 'Bearer' && !token) {
      throw new UnauthorizedException(httpMessages.userIsNotAuthorithation);
    }
    const { id, roles } = this.jwtService.verify(token);
    req.user = { id, roles };
    return requiredRoles.some((role) => req.user.roles?.includes(role));
  }
}
