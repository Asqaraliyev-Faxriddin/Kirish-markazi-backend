import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRole } from '../types/user.types';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) return true;

    const request = context.switchToHttp().getRequest();
    const user = request.user;
    
    if (!user) return false; // 🔒 agar token noto‘g‘ri bo‘lsa

    // @ts-ignore
    return requiredRoles.includes(user.role);
  }
}
