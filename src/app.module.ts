import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NganhsModule } from './nganhs/nganhs.module';
import { PrismaService } from './prisma/prisma.service';
import { HosModule } from './hos/hos.module';
import { LoaisModule } from './loais/loais.module';
import { UsersModule } from './users/users.module';
import { VungPhanBoModule } from './vung-phan-bo/vung-phan-bo.module';
import { StaticAssetModule } from './static-asset/static-asset.module';
import { RoleGuard } from './guards/role.guard';

@Module({
  imports: [
    NganhsModule,
    HosModule,
    LoaisModule,
    UsersModule,
    VungPhanBoModule,
    StaticAssetModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    PrismaService,
    {
      provide: APP_GUARD,
      useClass: RoleGuard,
    },
  ],
  exports: [PrismaService],
})
export class AppModule {}
