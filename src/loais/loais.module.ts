import { Module } from '@nestjs/common';
import { LoaisController } from './loais.controller';
import { LoaisService } from './loais.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  imports: [],
  controllers: [LoaisController],
  providers: [LoaisService, PrismaService],
  exports: [LoaisService]
})
export class LoaisModule {}
