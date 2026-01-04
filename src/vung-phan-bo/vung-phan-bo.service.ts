import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { QueryBuilder } from './utils/queryBuilder';
import { VungPhanBoMapper } from './mapper/vung-phan-bo.mapper';
import { 
  ResponseCreateVungPhanBoDto, 
  ResponseUpdateVungPhanBoDto, 
  ResponseSearchVungPhanBoDto, 
  ResponseDeleteVungPhanBoDto,
  ResponseCreateManyVungPhanBoDto
} from './dto/response-vung-phan-bo.dto';
import { ResponseAllVungPhanBoDto } from './dto/response-vung-phan-bo.dto';

@Injectable()
export class VungPhanBoService {
  constructor(private readonly prisma: PrismaService) {}

  getHello(): string {
    return 'From Vung Phan Bo Service, Hello World!';
  }

  async findOneById(id: number) {
    const vungPhanBo = await this.prisma.vung_phan_bo.findUnique({ where: { id } });
    if (!vungPhanBo) return null;
    return VungPhanBoMapper.toResponseUniqueVungPhanBoDto(vungPhanBo);
  }

  async findByTenDiaPhanHanhChinh(ten_dia_phan_hanh_chinh: string) {
    const vungPhanBo = await this.prisma.vung_phan_bo.findFirst({ 
      where: { 
        ten_dia_phan_hanh_chinh: {
          equals: ten_dia_phan_hanh_chinh,
          mode: 'insensitive'
        }
      } 
    });
    if (!vungPhanBo) return null;
    return VungPhanBoMapper.toResponseUniqueVungPhanBoDto(vungPhanBo);
  }

  async create(data: { ten_dia_phan_hanh_chinh: string; danh_sach_diem_bien?: string }): Promise<ResponseCreateVungPhanBoDto> {
    const vungPhanBo = await this.prisma.vung_phan_bo.create({ 
      data:{
        ...data,
        updated_at: new Date(),
      } 
    });
    return VungPhanBoMapper.toResponseCreateVungPhanBoDto(vungPhanBo);
  }

  async createMany(items: { ten_dia_phan_hanh_chinh: string; danh_sach_diem_bien?: string }[]): Promise<ResponseCreateManyVungPhanBoDto> {
    const createdVungPhanBos = await this.prisma.vung_phan_bo.createManyAndReturn({ data: items });
    return VungPhanBoMapper.toResponseCreateManyVungPhanBoDto(createdVungPhanBos);
  }

  async update(id: number, data: { ten_dia_phan_hanh_chinh?: string; danh_sach_diem_bien?: string }): Promise<ResponseUpdateVungPhanBoDto> {
    const vungPhanBo = await this.prisma.vung_phan_bo.update({ where: { id }, data });
    return VungPhanBoMapper.toResponseUpdateVungPhanBoDto(vungPhanBo);
  }

  async remove(id: number): Promise<ResponseDeleteVungPhanBoDto> {
    const vungPhanBo = await this.prisma.vung_phan_bo.delete({ where: { id } });
    return VungPhanBoMapper.toResponseDeleteVungPhanBoDto(vungPhanBo);
  }

  async allVungPhanBos(filter: { ten_dia_phan_hanh_chinh?: string; page: number; limit: number }): Promise<ResponseAllVungPhanBoDto> {
    const where = QueryBuilder.buildAllVungPhanBoFilter(filter.ten_dia_phan_hanh_chinh);
    const pagination = QueryBuilder.buildPageFilter(filter.page, filter.limit);
    
    const all = await this.prisma.vung_phan_bo.findMany({
      where,
      ...pagination,
      include: {
        _count:{
          select:{
            vi_tri_dia_li:true
          }
        }
      },
      orderBy: {
        ten_dia_phan_hanh_chinh: 'asc'
      }
    });

    const total = await this.prisma.vung_phan_bo.count({
      where,
      ...pagination
    });

    let n_pages = -1;
    if (filter.page === 1) {
      const allVungPhanBoCount = await this.prisma.vung_phan_bo.count();
      n_pages = Math.ceil(allVungPhanBoCount / filter.limit);
    }

    const mappedData = all.map(vungPhanBo => ({
      ...vungPhanBo,
      vi_tri_dia_li_count: vungPhanBo._count.vi_tri_dia_li,
      _count: undefined
    }));

    return VungPhanBoMapper.toResponseAllVungPhanBoDto(mappedData, total, n_pages !== -1 ? n_pages : undefined);
  }

}
