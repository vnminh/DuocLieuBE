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
import { CreateLoaiDto } from './dto/create-loai.dto';
import { UpdateLoaiDto } from './dto/update-loai.dto';
import { SearchLoaiDto } from './dto/search-loai.dto';

@Controller('loais')
export class LoaisController {
  constructor(@Inject(LoaisService) private readonly loaisService: LoaisService) {}

  
  @Get('all')
  async findAll(@Query() searchDto: SearchLoaiDto){
    console.log(searchDto);
    const loais = await this.loaisService.findAll(searchDto as any);
    return loais;
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

  @Put(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateDto: UpdateLoaiDto) {
    return this.loaisService.update(id, updateDto as any);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.loaisService.remove(id);
  }
}
