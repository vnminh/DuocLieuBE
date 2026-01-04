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
} from '@nestjs/common';
import { LoaisService } from './loais.service';
import { CreateLoaiDto, UpdateLoaiDto, SearchLoaiDto, CreateManyLoaiDto, CreateLoaiWithDetailsDto, CreateManyLoaiWithDetailsDto } from './dto/request-loais.dto';

@Controller('loais')
export class LoaisController {
  constructor(@Inject(LoaisService) private readonly loaisService: LoaisService) {}

  
  @Get('all')
  async allLoais(
    @Query('ten_khoa_hoc') ten_khoa_hoc?: string,
    @Query('ten_ho_khoa_hoc') ten_ho_khoa_hoc?: string,
    @Query('ten_nganh_khoa_hoc') ten_nganh_khoa_hoc?: string,
    @Query('vung_phan_bo_id') vung_phan_bo_id?: string,
    @Query('page', ParseIntPipe) page: number = 1,
    @Query('limit', ParseIntPipe) limit: number = 10
  ) {
    return this.loaisService.allLoais({ ten_khoa_hoc, ten_ho_khoa_hoc, ten_nganh_khoa_hoc, vung_phan_bo_id, page, limit });
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
  async createManyWithDetails(@Body() createManyDto: CreateManyLoaiWithDetailsDto) {
    return this.loaisService.createManyWithDetails(createManyDto.data);
  }

  @Put(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateDto: UpdateLoaiDto) {
    return this.loaisService.update(id, updateDto as any);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.loaisService.remove(id);
  }
}
