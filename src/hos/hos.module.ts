import { Module } from '@nestjs/common';
import { HosController } from './hos.controller';
import { HosService } from './hos.service';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  imports: [],
  controllers: [HosController],
  providers: [HosService, PrismaService],
  exports: [HosService]
})
export class HosModule {}
