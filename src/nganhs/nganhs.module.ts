import { Module } from '@nestjs/common';
import { NganhsController } from './nganhs.controller';
import { NganhsService } from './nganhs.service';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  imports: [],
  controllers: [NganhsController],
  providers: [NganhsService, PrismaService],
  exports: [NganhsService]
})
export class NganhsModule {}
