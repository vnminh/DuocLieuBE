import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { QueryBuilder } from './utils/queryBuilder';
import { NganhsMapper } from './mapper/nganhs.mapper';
import { 
  ResponseCreateNganhDto, 
  ResponseUpdateNganhDto, 
  ResponseSearchNganhDto, 
  ResponseDeleteNganhDto 
} from './dto/response-nganh.dto';

@Injectable()
export class NganhsService {
  constructor(private readonly prisma: PrismaService) {}

  getHello(): string {
    return 'From Nganhs Service, Hello World!';
  }
  async findAll(data:{page: number, limit: number, ten_khoa_hoc:string}): Promise<ResponseSearchNganhDto> {
    console.log(data.page, data.limit, data.ten_khoa_hoc)
    const where = QueryBuilder.buildQueryFilter(data.ten_khoa_hoc)
    const pagination = QueryBuilder.buildPageFilter(data.page, data.limit)
    const nganhs = await this.prisma.nganh.findMany({
      where,
      ...pagination,
      orderBy:{
        ten_khoa_hoc:'asc',
      }
    });
    return NganhsMapper.toResponseSearchNganhDto(nganhs);
  }

  async findOneById(id: number) {
    const nganh = await this.prisma.nganh.findUnique({ where: { id } });
    if (!nganh) return null;
    return NganhsMapper.toResponseUniqueNganhDto(nganh);
  }

  async findByTenKhoaHoc(ten_khoa_hoc: string) {
    const nganh = await this.prisma.nganh.findUnique({ where: { ten_khoa_hoc } });
    if (!nganh) return null;
    return NganhsMapper.toResponseUniqueNganhDto(nganh);
  }

  async create(data: { ten_khoa_hoc: string; ten_tieng_viet?: string; mo_ta?: string }): Promise<ResponseCreateNganhDto> {
    const nganh = await this.prisma.nganh.create({ 
      data:{
        ...data,
        updated_at: new Date(),
      } 
    });
    return NganhsMapper.toResponseCreateNganhDto(nganh);
  }

  async update(id: number, data: { ten_khoa_hoc?: string; ten_tieng_viet?: string; mo_ta?: string }): Promise<ResponseUpdateNganhDto> {
    const nganh = await this.prisma.nganh.update({ where: { id }, data });
    return NganhsMapper.toResponseUpdateNganhDto(nganh);
  }

  async remove(id: number): Promise<ResponseDeleteNganhDto> {
    const nganh = await this.prisma.nganh.delete({ where: { id } });
    return NganhsMapper.toResponseDeleteNganhDto(nganh);
  }

}
