import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AllowRoles } from '../decorators/role.decorator';
import { Roles } from 'src/common/interface/auth/enum/Roles';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get(AllowRoles, context.getHandler());
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user['roles'] || {
      roles: [],
    };
    const matchRoles = await this.matchRoles(roles, user.roles);
    if (!matchRoles) {
      return false;
    }

    return true;
  }

  private async matchRoles(requiredRoles: Roles[], userRoles: Roles[]) {
    if (userRoles.includes(Roles.BANNED) || userRoles.includes(Roles.SUSPENDED))
      return false;
    if (userRoles.includes(Roles.SUPER_USER || Roles.ADMIN)) return true;
    return requiredRoles.some((role) => userRoles.includes(role));
  }
}
