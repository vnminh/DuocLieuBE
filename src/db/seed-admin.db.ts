import { PrismaService } from '../prisma/prisma.service';
import { UserRole, UserStatus } from '@prisma/duoclieu-client';
import bycrpt from 'bcrypt';

const DEFAULT_ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@duoclieu.local';
const DEFAULT_ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'Admin@12345';
const DEFAULT_ADMIN_FULL_NAME = process.env.ADMIN_FULL_NAME || 'Administrator';

async function seedAdmin(prisma: PrismaService) {
  try {
    const saltOrRound = 10;
    const hashedPassword = await bycrpt.hash(DEFAULT_ADMIN_PASSWORD, saltOrRound);

    const adminUser = await prisma.user.upsert({
      where: { email: DEFAULT_ADMIN_EMAIL },
      update: {
        full_name: DEFAULT_ADMIN_FULL_NAME,
        password: hashedPassword,
        role: UserRole.ADMIN,
        status: UserStatus.ACTIVE,
      },
      create: {
        full_name: DEFAULT_ADMIN_FULL_NAME,
        email: DEFAULT_ADMIN_EMAIL,
        password: hashedPassword,
        role: UserRole.ADMIN,
        status: UserStatus.ACTIVE,
      },
    });

    console.log(
      `Admin account is ready: email=${adminUser.email}, password=${DEFAULT_ADMIN_PASSWORD}`,
    );

    process.exit(0);
  } catch (error) {
    console.error('Error seeding admin account:', error);
    process.exit(1);
  }
}

seedAdmin(new PrismaService());
