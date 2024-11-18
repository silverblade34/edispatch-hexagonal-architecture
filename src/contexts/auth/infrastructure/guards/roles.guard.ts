import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from 'src/shared/domain/enums/role.enum';
import {
  InsufficientPermissionsException,
  InvalidUserException,
} from 'src/shared/exceptions/custom-exceptions';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.get<Role[]>(
      'roles',
      context.getHandler(),
    );

    if (!requiredRoles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user) {
      throw new InvalidUserException();
    }

    if (!user.role) {
      throw new InvalidUserException();
    }

    const hasPermission = requiredRoles.some((role) => user.role === role);

    if (!hasPermission) {
      throw new InsufficientPermissionsException(requiredRoles.join(', '));
    }

    return true;
  }
}
