import { AuthService } from './../auth.service';
import { JwtStrategy } from 'src/auth/strategies/jwt.strategy';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Role } from './roles.enum';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requireRoles = this.reflector.getAllAndOverride<Role[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);

    const { user } = context.switchToHttp().getRequest();

    console.log(user);

    if (!requireRoles) return true;

    return requireRoles[0] === user.roleId;
  }
}

export default RoleGuard;
