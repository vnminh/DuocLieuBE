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
import { VungPhanBoService } from './vung-phan-bo.service';
import { CreateVungPhanBoDto, UpdateVungPhanBoDto, SearchVungPhanBoDto, CreateManyVungPhanBoDto } from './dto/request-vung-phan-bo.dto';

@Controller('vung-phan-bo')
export class VungPhanBoController {
  constructor(@Inject(VungPhanBoService) private readonly vungPhanBoService: VungPhanBoService) {}

  

  @Get('all-vung-phan-bo')
  async allVungPhanBos(
    @Query('ten_dia_phan_hanh_chinh') ten_dia_phan_hanh_chinh?: string,
    @Query('page', ParseIntPipe) page: number = 1,
    @Query('limit', ParseIntPipe) limit: number = 10
  ) {
    return this.vungPhanBoService.allVungPhanBos({ ten_dia_phan_hanh_chinh, page, limit });
  }

  @Get(':ten_dia_phan_hanh_chinh')
  async findByTen(@Param('ten_dia_phan_hanh_chinh') ten_dia_phan_hanh_chinh: string) {
    const vungPhanBo = await this.vungPhanBoService.findByTenDiaPhanHanhChinh(ten_dia_phan_hanh_chinh);
    if (!vungPhanBo) throw new NotFoundException('Vung Phan Bo not found');
    return vungPhanBo;
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const vungPhanBo = await this.vungPhanBoService.findOneById(id);
    if (!vungPhanBo) throw new NotFoundException('Vung Phan Bo not found');
    return vungPhanBo;
  }
  
  @Post()
  async create(@Body() createDto: CreateVungPhanBoDto) {
    return this.vungPhanBoService.create(createDto as any);
  }

  @Post('many')
  async createMany(@Body() createManyDto: CreateManyVungPhanBoDto) {
    return this.vungPhanBoService.createMany(createManyDto.data as any);
  }

  @Put(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateDto: UpdateVungPhanBoDto) {
    return this.vungPhanBoService.update(id, updateDto as any);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.vungPhanBoService.remove(id);
  }
}
