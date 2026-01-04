import { Module } from '@nestjs/common';
import { VungPhanBoController } from './vung-phan-bo.controller';
import { VungPhanBoService } from './vung-phan-bo.service';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  imports: [],
  controllers: [VungPhanBoController],
  providers: [VungPhanBoService, PrismaService],
  exports: [VungPhanBoService]
})
export class VungPhanBoModule {}
