import {
  CanActivate,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';

import {
  Reflector,
} from '@nestjs/core';

import {
  UserRole,
} from 'libs/common';

import {
  AuthenticatedUser,
} from '../interfaces/authenticated-user.interface';

import {
  ROLES_KEY,
} from '../decorators/roles.decorator';

@Injectable()
export class RolesGuard
  implements CanActivate
{
  constructor(
    private readonly reflector: Reflector,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean {
    const requiredRoles =
      this.reflector.getAllAndOverride<
        UserRole[]
      >(
        ROLES_KEY,
        [
          context.getHandler(),
          context.getClass(),
        ],
      );

    if (!requiredRoles?.length) {
      return true;
    }

    const request =
      context.switchToHttp().getRequest();

    const user:
      AuthenticatedUser =
      request.user;

    if (!user) {
      return false;
    }

    return requiredRoles.includes(
      user.role as UserRole,
    );
  }
}