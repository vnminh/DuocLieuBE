import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  OnModuleInit,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UserRole } from '@prisma/duoclieu-client';

interface CachedPermission {
  endpoint: string;
  regex: RegExp;
  roles: UserRole[];
}

const PUBLIC_ENDPOINTS = [
  '[POST]/api/v1/users/signup',
  '[POST]/api/v1/users/login',
  '[POST]/api/v1/users/reset-password',
  '[POST]/api/v1/users/verify-code',
  '[PUT]/api/v1/users/user/:id'
];

@Injectable()
export class RoleGuard implements CanActivate, OnModuleInit {
  private permissions: CachedPermission[] = [];

  constructor(private readonly prisma: PrismaService) {}

  async onModuleInit() {
    await this.loadPermissions();
  }

  private async loadPermissions() {
    try {
      const dbPermissions = await this.prisma.permission.findMany({
        include: { roles: true },
      });

      this.permissions = dbPermissions.map((p) => ({
        endpoint: p.endpoint,
        regex: this.endpointToRegex(p.endpoint),
        roles: p.roles.map((r) => r.role),
      }));
    } catch {
      // DB may not be seeded yet - permissions will be empty
      this.permissions = [];
    }
  }

  private endpointToRegex(endpoint: string): RegExp {
    const match = endpoint.match(/^\[(\w+)\](.+)$/);
    if (!match) return new RegExp('^$');

    const method = match[1];
    const path = match[2];

    // Escape regex special chars, then replace :param with wildcard
    const regexPath = path
      .replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
      .replace(/:\\w+/g, '[^/]+');

    return new RegExp(`^\\[${method}\\]${regexPath}$`);
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const method = request.method.toUpperCase();

    // Use the route pattern path (e.g., /api/v1/users/user/:id)
    const routePath = request.route?.path || request.path;
    const endpoint = `[${method}]${routePath}`;

    // Allow public endpoints without any role
    if (PUBLIC_ENDPOINTS.includes(endpoint)) {
      return true;
    }

    // Get role from header
    const role = request.headers['x-user-role'] as string;

    if (!role) {
      throw new ForbiddenException('No role provided. Access denied.');
    }

    // Reload permissions if empty (DB may have been seeded after startup)
    if (this.permissions.length === 0) {
      await this.loadPermissions();
    }

    // Find matching permission
    const matchingPermission = this.permissions.find((p) =>
      p.regex.test(endpoint),
    );

    if (!matchingPermission) {
      // No permission defined - allow (endpoint not in DB, e.g. root /)
      return true;
    }

    if (!matchingPermission.roles.includes(role as UserRole)) {
      throw new ForbiddenException(
        `Access denied. Role '${role}' cannot access this endpoint.`,
      );
    }

    return true;
  }
}
