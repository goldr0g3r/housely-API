import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { AllowRoles } from '../decorators/role.decorator';
import { Roles } from 'src/common/interface/auth/enum/Roles';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.get(AllowRoles, context.getHandler());
    console.log('roles', roles);
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user || {
      roles: [],
    };
    const matchRoles = this.matchRoles(roles, user.roles);
    if (matchRoles) return true;

    throw new ForbiddenException(
      'You do not have permission to access this resource',
    );
  }

  private matchRoles(requiredRoles: Roles[], userRoles: Roles[]) {
    if (userRoles.includes(Roles.BANNED)) {
      return false;
    }
    if (requiredRoles.includes(Roles.ADMIN)) {
      return true;
    }
    return requiredRoles.some((role) => userRoles.includes(role));
  }
}
