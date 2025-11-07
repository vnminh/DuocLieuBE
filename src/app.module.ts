import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NganhsModule } from './nganhs/nganhs.module';
import { PrismaService } from './prisma/prisma.service';
import { HosModule } from './hos/hos.module';
import { LoaisModule } from './loais/loais.module';

@Module({
  imports: [NganhsModule, HosModule, LoaisModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
  exports: [PrismaService]
})
export class AppModule {}
