import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { QueryBuilder } from './utils/queryBuilder';
import { SearchLoaiDto } from './dto/search-loai.dto';
import { LoaisMapper } from './mapper/loais.mapper';
import { 
  ResponseCreateLoaiDto, 
  ResponseUpdateLoaiDto, 
  ResponseSearchLoaiDto, 
  ResponseDeleteLoaiDto 
} from './dto/response-loai.dto';

@Injectable()
export class LoaisService {
  constructor(private readonly prisma: PrismaService) {}

  getHello(): string {
    return 'From Loais Service, Hello World!';
  }
  async findAll(data:{page: number, limit: number, ten_loai:string,  ten_ho_khoa_hoc:string, ten_nganh_khoa_hoc:string}): Promise<ResponseSearchLoaiDto> {
    console.log(data.page, data.limit, data.ten_loai, data.ten_ho_khoa_hoc, data.ten_nganh_khoa_hoc)
    const where = QueryBuilder.buildQueryFilter(data.ten_loai, data.ten_ho_khoa_hoc, data.ten_nganh_khoa_hoc)
    const pagination = QueryBuilder.buildPageFilter(data.page, data.limit)
    const loais = await this.prisma.loai.findMany({
      where,
      ...pagination,
      include:{
        ho:{
          include:{
            nganh:true,
          }
        },
        dac_diem_sinh_hoc:{
          include:{
            vung_phan_bo:true,
          }
        },
        cong_dung_va_thanh_phan_hoa_hoc:true,
        khai_thac_va_che_bien:true,
        vi_tri_dia_li:true,
        hinh_anh:true,
      },
      orderBy:{
        ten_khoa_hoc:'asc',
      }
    });
    return LoaisMapper.toResponseSearchLoaiDto(loais);
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
        dac_diem_sinh_hoc:{
          include:{
            vung_phan_bo:true,
          }
        },
        cong_dung_va_thanh_phan_hoa_hoc:true,
        khai_thac_va_che_bien:true,
        vi_tri_dia_li:true,
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
        dac_diem_sinh_hoc:{
          include:{
            vung_phan_bo:true,
          }
        },
        cong_dung_va_thanh_phan_hoa_hoc:true,
        khai_thac_va_che_bien:true,
        vi_tri_dia_li:true,
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

}
