import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { QueryBuilder } from './utils/queryBuilder';
import { SearchLoaiDto } from './dto/search-loai.dto';

@Injectable()
export class LoaisService {
  constructor(private readonly prisma: PrismaService) {}

  getHello(): string {
    return 'From Loais Service, Hello World!';
  }
  async findAll(data:{page: number, limit: number, ten_loai:string,  ten_ho_khoa_hoc:string, ten_nganh_khoa_hoc:string}) {
    console.log(data.page, data.limit, data.ten_loai, data.ten_ho_khoa_hoc, data.ten_nganh_khoa_hoc)
    const where = QueryBuilder.buildQueryFilter(data.ten_loai, data.ten_ho_khoa_hoc, data.ten_nganh_khoa_hoc)
    const pagination = QueryBuilder.buildPageFilter(data.page, data.limit)
    const loais = this.prisma.loai.findMany({
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
    return loais
  }

  async findOneById(id: number) {
    return this.prisma.loai.findUnique({ 
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
  }

  async findByTenKhoaHoc(ten_khoa_hoc: string) {
    return this.prisma.loai.findUnique({ 
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
  }

  async create(data: { ten_khoa_hoc: string; ten_tieng_viet?: string; ten_goi_khac?: string; ten_ho_khoa_hoc: string }) {
    return this.prisma.loai.create({ data });
  }

  async update(id: number, data: { ten_khoa_hoc?: string; ten_tieng_viet?: string; ten_goi_khac?: string; ten_ho_khoa_hoc?: string }) {
    return this.prisma.loai.update({ where: { id }, data });
  }

  async remove(id: number) {
    return this.prisma.loai.delete({ where: { id } });
  }

}
