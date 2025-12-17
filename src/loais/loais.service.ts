import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { QueryBuilder } from './utils/queryBuilder';
import { SearchLoaiDto } from './dto/request-loais.dto';
import { LoaisMapper } from './mapper/loais.mapper';
import { 
  ResponseCreateLoaiDto, 
  ResponseUpdateLoaiDto, 
  ResponseSearchLoaiDto, 
  ResponseDeleteLoaiDto 
} from './dto/response-loais.dto';
import { ResponseAllLoaisDto } from './dto/response-loais.dto';

@Injectable()
export class LoaisService {
  constructor(private readonly prisma: PrismaService) {}

  getHello(): string {
    return 'From Loais Service, Hello World!';
  }
  
  async findOneById(id: number) {
    const loai = await this.prisma.loai.findUnique({ 
      where: { id },
      include:{
        ho:{
          include:{
            nganh:true,
          }
        },
        dac_diem_sinh_hoc:true,
        cong_dung_va_thanh_phan_hoa_hoc:true,
        khai_thac_va_che_bien:true,
        vi_tri_dia_li:{
          include:{
            vung_phan_bo:true
          }
        },
        hinh_anh:true,
      },
    });
    if (!loai) return null;
    return LoaisMapper.toResponseUniqueLoaiDto(loai);
  }

  async findByTenKhoaHoc(ten_khoa_hoc: string) {
    const loai = await this.prisma.loai.findUnique({ 
      where: { ten_khoa_hoc },
      include:{
        ho:{
          include:{
            nganh:true,
          }
        },
        dac_diem_sinh_hoc:true,
        cong_dung_va_thanh_phan_hoa_hoc:true,
        khai_thac_va_che_bien:true,
        vi_tri_dia_li:{
          include:{
            vung_phan_bo:true
          }
        },
        hinh_anh:true,
      },
    });
    if (!loai) return null;
    return LoaisMapper.toResponseUniqueLoaiDto(loai);
  }

  async create(data: { ten_khoa_hoc: string; ten_tieng_viet?: string; ten_goi_khac?: string; ten_ho_khoa_hoc: string }): Promise<ResponseCreateLoaiDto> {
    const loai = await this.prisma.loai.create({ data });
    return LoaisMapper.toResponseCreateLoaiDto(loai);
  }

  async update(id: number, data: { ten_khoa_hoc?: string; ten_tieng_viet?: string; ten_goi_khac?: string; ten_ho_khoa_hoc?: string }): Promise<ResponseUpdateLoaiDto> {
    const loai = await this.prisma.loai.update({ 
      where: { id }, 
      data:{
        ...data,
        updated_at: new Date()
      } 
    });
    return LoaisMapper.toResponseUpdateLoaiDto(loai);
  }

  async remove(id: number): Promise<ResponseDeleteLoaiDto> {
    const loai = await this.prisma.loai.delete({ where: { id } });
    return LoaisMapper.toResponseDeleteLoaiDto(loai);
  }

  async allLoais(filter: { ten_khoa_hoc?: string; ten_ho_khoa_hoc?: string; ten_nganh_khoa_hoc?: string; vung_phan_bo_id?: number; page: number; limit: number }): Promise<ResponseAllLoaisDto> {
    const where = QueryBuilder.buildQueryFilter(filter.ten_khoa_hoc, filter.ten_ho_khoa_hoc, filter.ten_nganh_khoa_hoc, filter.vung_phan_bo_id);
    const pagination = QueryBuilder.buildPageFilter(filter.page, filter.limit);
    
    const loais = await this.prisma.loai.findMany({
      where,
      ...pagination,
      include: {
        ho: {
          select: {
            ten_khoa_hoc: true,
            ten_tieng_viet: true,
            nganh: {
              select: {
                ten_khoa_hoc: true,
                ten_tieng_viet: true
              }
            }
          }
        },
        dac_diem_sinh_hoc:true,
        cong_dung_va_thanh_phan_hoa_hoc:true,
        khai_thac_va_che_bien:true,
        vi_tri_dia_li:{
          include:{
            vung_phan_bo:true
          }
        },
        hinh_anh:true,
      },
      orderBy: {
        ten_khoa_hoc: 'asc'
      }
    });

    const total = await this.prisma.loai.count({
      where,
      ...pagination
    });

    let n_pages = -1;
    if (filter.page === 1) {
      const allLoaisCount = await this.prisma.loai.count();
      n_pages = Math.ceil(allLoaisCount / filter.limit);
    }

    return LoaisMapper.toResponseAllLoaisDto(loais, total, n_pages !== -1 ? n_pages : undefined);
  }

}
