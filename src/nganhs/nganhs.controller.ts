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
import { NganhsService } from './nganhs.service';
import { CreateNganhDto, UpdateNganhDto, SearchNganhDto } from './dto/request-nganhs.dto';

@Controller('nganhs')
export class NganhsController {
  constructor(@Inject(NganhsService) private readonly nganhsService: NganhsService) {}

  
  @Get('all')
  async findAll(@Query() searchDto: SearchNganhDto){
    console.log(searchDto);
    const nganhs = await this.nganhsService.findAll(searchDto as any);
    return nganhs;
  }

  @Get(':ten_khoa_hoc')
  async findByTen(@Param('ten_khoa_hoc') ten_khoa_hoc: string) {
    const nganh = await this.nganhsService.findByTenKhoaHoc(ten_khoa_hoc);
    if (!nganh) throw new NotFoundException('Nganh not found');
    return nganh;
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const nganh = await this.nganhsService.findOneById(id);
    if (!nganh) throw new NotFoundException('Nganh not found');
    return nganh;
  }
  
  @Post()
  async create(@Body() createDto: CreateNganhDto) {
    return this.nganhsService.create(createDto as any);
  }

  @Put(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateDto: UpdateNganhDto) {
    return this.nganhsService.update(id, updateDto as any);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.nganhsService.remove(id);
  }
}
