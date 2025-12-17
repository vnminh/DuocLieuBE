import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { QueryBuilder } from './utils/queryBuilder';
import { NganhsMapper } from './mapper/nganhs.mapper';
import { 
  ResponseCreateNganhDto, 
  ResponseUpdateNganhDto, 
  ResponseSearchNganhDto, 
  ResponseDeleteNganhDto 
} from './dto/response-nganhs.dto';
import { ResponseAllNganhsDto } from './dto/response-nganhs.dto';

@Injectable()
export class NganhsService {
  constructor(private readonly prisma: PrismaService) {}

  getHello(): string {
    return 'From Nganhs Service, Hello World!';
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

  async allNganhs(filter: { ten_khoa_hoc?: string; page: number; limit: number }): Promise<ResponseAllNganhsDto> {
    const where = QueryBuilder.buildAllNganhsFilter(filter.ten_khoa_hoc);
    const pagination = QueryBuilder.buildPageFilter(filter.page, filter.limit);
    
    const all = await this.prisma.nganh.findMany({
      where,
      ...pagination,
      include: {
        _count:{
          select:{
            hos:true
          }
        }
      },
      orderBy: {
        ten_khoa_hoc: 'asc'
      }
    });

    const total = await this.prisma.nganh.count({
      where,
      ...pagination
    });

    let n_pages = -1;
    if (filter.page === 1) {
      const allNganhsCount = await this.prisma.nganh.count();
      n_pages = Math.ceil(allNganhsCount / filter.limit);
    }

    const mappedData = all.map(nganh => ({
      ...nganh,
      hos_count: nganh._count.hos,
      _count: undefined
    }));

    return NganhsMapper.toResponseAllNganhsDto(mappedData, total, n_pages !== -1 ? n_pages : undefined);
  }

}
