import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { QueryBuilder } from './utils/queryBuilder';

@Injectable()
export class HosService {
  constructor(private readonly prisma: PrismaService) {}

  getHello(): string {
    return 'From Hos Service, Hello World!';
  }
  async findAll(data:{page: number, limit: number, ten_ho:string,  ten_nganh_khoa_hoc:string}) {
    console.log(data.page, data.limit, data.ten_ho, data.ten_nganh_khoa_hoc)
    const where = QueryBuilder.buildQueryFilter(data.ten_ho, data.ten_nganh_khoa_hoc)
    const pagination = QueryBuilder.buildPageFilter(data.page, data.limit)
    const hos = this.prisma.ho.findMany({
      where,
      ...pagination,
      include:{
        nganh:true,
      },
      orderBy:{
        ten_khoa_hoc:'asc',
      }
    });
    return hos
  }

  async findOneById(id: number) {
    return this.prisma.ho.findUnique({
      where: { id },
      include:{
        nganh:true,
      }
    });
  }

  async findByTenKhoaHoc(ten_khoa_hoc: string) {
    return this.prisma.ho.findUnique({ 
      where: { ten_khoa_hoc },
      include:{
        nganh:true,
      } 
    });
  }

  async create(data: { ten_khoa_hoc: string; ten_tieng_viet?: string; mo_ta?: string; ten_nganh_khoa_hoc: string }) {
    return this.prisma.ho.create({ data });
  }

  async update(id: number, data: { ten_khoa_hoc?: string; ten_tieng_viet?: string; mo_ta?: string; ten_nganh_khoa_hoc?: string }) {
    return this.prisma.ho.update({ where: { id }, data });
  }

  async remove(id: number) {
    return this.prisma.ho.delete({ where: { id } });
  }

}
