import {
  Controller,
  Get,
  Inject,
  Param,
  Post,
  Body,
  Put,
  Delete,
  Query,
  ParseIntPipe,
  NotFoundException,
  Res,
  StreamableFile,
} from '@nestjs/common';
import type { Response } from 'express';
import { createReadStream } from 'fs';
import { LoaisService } from './loais.service';
import {
  CreateLoaiDto,
  SearchLoaiDto,
  CreateManyLoaiDto,
  CreateLoaiWithDetailsDto,
  CreateManyLoaiWithDetailsDto,
  UpdateLoaiWithDetailsDto,
} from './dto/request-loais.dto';

@Controller('loais')
export class LoaisController {
  constructor(
    @Inject(LoaisService) private readonly loaisService: LoaisService,
  ) {}

  @Get('all')
  async allLoais(
    @Query('ten_khoa_hoc') ten_khoa_hoc?: string,
    @Query('ten_ho_khoa_hoc') ten_ho_khoa_hoc?: string,
    @Query('ten_nganh_khoa_hoc') ten_nganh_khoa_hoc?: string,
    @Query('vung_phan_bo_id') vung_phan_bo_id?: string,
    @Query('page', ParseIntPipe) page: number = 1,
    @Query('limit', ParseIntPipe) limit: number = 10,
  ) {
    return this.loaisService.allLoais({
      ten_khoa_hoc,
      ten_ho_khoa_hoc,
      ten_nganh_khoa_hoc,
      vung_phan_bo_id,
      page,
      limit,
    });
  }

  @Get(':id/detail')
  async findOneWithRelations(@Param('id', ParseIntPipe) id: number) {
    const loai = await this.loaisService.findOneById(id);
    if (!loai) throw new NotFoundException('Loai not found');
    return loai;
  }

  @Get(':id/images/count')
  async getImageCount(@Param('id', ParseIntPipe) id: number) {
    return this.loaisService.getImageCount(id);
  }

  @Get(':id/images/:index')
  async getImageByIndex(
    @Param('id', ParseIntPipe) id: number,
    @Param('index', ParseIntPipe) index: number,
    @Res({ passthrough: true }) res: Response,
  ): Promise<StreamableFile> {
    const result = await this.loaisService.getImageByIndex(id, index);
    
    if (!result) {
      throw new NotFoundException('Image not found');
    }

    const file = createReadStream(result.filePath);
    res.set({
      'Content-Type': result.mimeType,
      'Cache-Control': 'public, max-age=31536000',
    });

    return new StreamableFile(file);
  }

  @Get(':ten_khoa_hoc')
  async findByTen(@Param('ten_khoa_hoc') ten_khoa_hoc: string) {
    const loai = await this.loaisService.findByTenKhoaHoc(ten_khoa_hoc);
    if (!loai) throw new NotFoundException('Loai not found');
    return loai;
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const loai = await this.loaisService.findOneById(id);
    if (!loai) throw new NotFoundException('Loai not found');
    return loai;
  }

  @Post()
  async create(@Body() createDto: CreateLoaiDto) {
    return this.loaisService.create(createDto as any);
  }

  @Post('many')
  async createMany(@Body() createManyDto: CreateManyLoaiDto) {
    return this.loaisService.createMany(createManyDto.data as any);
  }

  @Post('with-details')
  async createWithDetails(@Body() createDto: CreateLoaiWithDetailsDto) {
    return this.loaisService.createWithDetails(createDto);
  }

  @Post('many-with-details')
  async createManyWithDetails(
    @Body() createManyDto: CreateManyLoaiWithDetailsDto,
  ) {
    return this.loaisService.createManyWithDetails(createManyDto.data);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateLoaiWithDetailsDto,
  ) {
    return this.loaisService.updateWithDetails(id, updateDto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.loaisService.remove(id);
  }
}
