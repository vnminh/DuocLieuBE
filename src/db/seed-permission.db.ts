import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/duoclieu-client'
async function seedPermission(prisma: PrismaService) {
    const app = await NestFactory.create(AppModule);
    await app.init()
    //=============================================================================================
    try {
        const server = app.getHttpAdapter().getInstance();
        const router = server.router;

        const permissions:Prisma.PermissionCreateInput[] = router.stack
            .map(layer => {
                if (layer.route) {
                    // return {
                    //     route: {
                    //         path: layer.route?.path,
                    //         method: layer.route?.stack[0].method,
                    //     },
                    // };
                    let permission;
                    if (layer.route) permission={
                        endpoint:`[${layer.route?.stack[0].method.toUpperCase()}]${layer.route?.path}`
                    }  
                    else permission = undefined

                    return permission;
                    
                }
            })
            .filter(item => item !== undefined);
        const saved_permissions = await prisma.permission.createMany({
            data: permissions
        })
        console.log(saved_permissions);
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
