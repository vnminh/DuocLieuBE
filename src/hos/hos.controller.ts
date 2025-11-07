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
import { HosService } from './hos.service';
import { CreateHoDto } from './dto/create-ho.dto';
import { UpdateHoDto } from './dto/update-ho.dto';
import { SearchHoDto } from './dto/search-ho.dto';

@Controller('hos')
export class HosController {
  constructor(@Inject(HosService) private readonly hosService: HosService) {}

  
  @Get('all')
  async findAll(@Query() searchDto: SearchHoDto){
    console.log(searchDto);
    const hos = await this.hosService.findAll(searchDto as any);
    return hos;
  }

  @Get(':ten_khoa_hoc')
  async findByTen(@Param('ten_khoa_hoc') ten_khoa_hoc: string) {
    const ho = await this.hosService.findByTenKhoaHoc(ten_khoa_hoc);
    if (!ho) throw new NotFoundException('Ho not found');
    return ho;
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const ho = await this.hosService.findOneById(id);
    if (!ho) throw new NotFoundException('Ho not found');
    return ho;
  }
  
  @Post()
  async create(@Body() createDto: CreateHoDto) {
    return this.hosService.create(createDto as any);
  }

  @Put(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateDto: UpdateHoDto) {
    return this.hosService.update(id, updateDto as any);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.hosService.remove(id);
  }
}
