import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NganhsModule } from './nganhs/nganhs.module';
import { PrismaService } from './prisma/prisma.service';
import { HosModule } from './hos/hos.module';
import { LoaisModule } from './loais/loais.module';
import { UsersModule } from './users/users.module';
import { VungPhanBoModule } from './vung-phan-bo/vung-phan-bo.module';

@Module({
  imports: [
    NganhsModule, 
    HosModule, 
    LoaisModule, 
    UsersModule,
    VungPhanBoModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
  exports: [PrismaService]
})
export class AppModule {}
