import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { QueryBuilder } from './utils/queryBuilder';

@Injectable()
export class NganhsService {
  constructor(private readonly prisma: PrismaService) {}

  getHello(): string {
    return 'From Nganhs Service, Hello World!';
  }
  async findAll(data:{page: number, limit: number, ten_khoa_hoc:string}) {
    console.log(data.page, data.limit, data.ten_khoa_hoc)
    const where = QueryBuilder.buildQueryFilter(data.ten_khoa_hoc)
    const pagination = QueryBuilder.buildPageFilter(data.page, data.limit)
    const nganhs = this.prisma.nganh.findMany({
      where,
      ...pagination,
      orderBy:{
        ten_khoa_hoc:'asc',
      }
    });
    return nganhs
  }

  async findOneById(id: number) {
    return this.prisma.nganh.findUnique({ where: { id } });
  }

  async findByTenKhoaHoc(ten_khoa_hoc: string) {
    return this.prisma.nganh.findUnique({ where: { ten_khoa_hoc } });
  }

  async create(data: { ten_khoa_hoc: string; ten_tieng_viet?: string; mo_ta?: string }) {
    return this.prisma.nganh.create({ data });
  }

  async update(id: number, data: { ten_khoa_hoc?: string; ten_tieng_viet?: string; mo_ta?: string }) {
    return this.prisma.nganh.update({ where: { id }, data });
  }

  async remove(id: number) {
    return this.prisma.nganh.delete({ where: { id } });
  }

}
