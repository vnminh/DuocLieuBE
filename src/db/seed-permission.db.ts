import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { PrismaService } from '../prisma/prisma.service';
import { UserRole } from '@prisma/duoclieu-client';

const PUBLIC_ENDPOINTS = [
  '[POST]/api/v1/users/signup',
  '[POST]/api/v1/users/login',
  '[POST]/api/v1/users/reset-password',
  '[POST]/api/v1/users/verify-code',
  '[PUT]/api/v1/users/user/:id'
];

function getRolesForEndpoint(endpoint: string): UserRole[] {
  // Public endpoints - all roles can access
  if (PUBLIC_ENDPOINTS.includes(endpoint)) {
    return [UserRole.ADMIN, UserRole.STAFF, UserRole.USER];
  }

  const match = endpoint.match(/^\[(\w+)\](.+)$/);
  if (!match) return [UserRole.ADMIN];

  const method = match[1].toUpperCase();
  const path = match[2];

  // ADMIN always has access
  const roles: UserRole[] = [UserRole.ADMIN];

  // USER: GET only
  if (method === 'GET') {
    roles.push(UserRole.USER);
  }

  // STAFF: all except DELETE on any resource, and no DELETE/PUT/PATCH for users
  if (method === 'DELETE') {
    // STAFF cannot delete anything - skip
  } else if (
    path.startsWith('/api/v1/users/user') &&
    ['PUT', 'POST', 'PATCH'].includes(method)
  ) {
    // STAFF cannot modify users (create, update) - skip
  } else {
    roles.push(UserRole.STAFF);
  }

  return roles;
}

async function seedPermission(prisma: PrismaService) {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v1');
  await app.init();

  try {
    const server = app.getHttpAdapter().getInstance();
    const router = server.router;

    // Extract all route endpoints
    const endpoints: string[] = router.stack
      .map((layer: any) => {
        if (layer.route) {
          return `[${layer.route.stack[0].method.toUpperCase()}]${layer.route.path}`;
        }
        return undefined;
      })
      .filter((item: any) => item !== undefined);

    // Clear existing role permissions and permissions
    await prisma.rolePermission.deleteMany({});
    await prisma.permission.deleteMany({});

    // Seed permissions with role mappings
    for (const endpoint of endpoints) {
      const permission = await prisma.permission.create({
        data: { endpoint },
      });

      const roles = getRolesForEndpoint(endpoint);
      for (const role of roles) {
        await prisma.rolePermission.create({
          data: {
            role,
            permission_id: permission.id,
          },
        });
      }

      console.log(
        `  ${endpoint} => [${roles.join(', ')}]`,
      );
    }

    console.log(`\nSeeded ${endpoints.length} permissions with role mappings`);
    console.log('Permission seeded completed successfully');
    await app.close();
    process.exit(0);
  } catch (error) {
    console.error('Error during permission synchronization:', error);
    await app.close();
    process.exit(1);
  }
}

seedPermission(new PrismaService());
