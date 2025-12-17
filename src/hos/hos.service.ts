import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { QueryBuilder } from './utils/queryBuilder';
import { HosMapper } from './mapper/hos.mapper';
import { 
  ResponseCreateHoDto, 
  ResponseUpdateHoDto, 
  ResponseSearchHoDto, 
  ResponseDeleteHoDto,
  ResponseCreateManyHoDto
} from './dto/response-ho.dto';
import { ResponseAllHosDto } from './dto/response-hos.dto';

@Injectable()
export class HosService {
  constructor(private readonly prisma: PrismaService) {}

  getHello(): string {
    return 'From Hos Service, Hello World!';
  }
  async findAll(data:{page: number, limit: number, ten_ho:string,  ten_nganh_khoa_hoc:string}): Promise<ResponseSearchHoDto> {
    console.log(data.page, data.limit, data.ten_ho, data.ten_nganh_khoa_hoc)
    const where = QueryBuilder.buildQueryFilter(data.ten_ho, data.ten_nganh_khoa_hoc)
    const pagination = QueryBuilder.buildPageFilter(data.page, data.limit)
    const hos = await this.prisma.ho.findMany({
      where,
      ...pagination,
      include:{
        nganh:true,
      },
      orderBy:{
        ten_khoa_hoc:'asc',
      }
    });
    return HosMapper.toResponseSearchHoDto(hos);
  }

  async findOneById(id: number) {
    const ho = await this.prisma.ho.findUnique({
      where: { id },
      include:{
        nganh:true,
      }
    });
    if (!ho) return null;
    return HosMapper.toResponseUniqueHoDto(ho);
  }

  async findByTenKhoaHoc(ten_khoa_hoc: string) {
    const ho = await this.prisma.ho.findUnique({ 
      where: { ten_khoa_hoc },
      include:{
        nganh:true,
      } 
    });
    if (!ho) return null;
    return HosMapper.toResponseUniqueHoDto(ho);
  }

  async create(data: { ten_khoa_hoc: string; ten_tieng_viet?: string; mo_ta?: string; ten_nganh_khoa_hoc: string }): Promise<ResponseCreateHoDto> {
    const ho = await this.prisma.ho.create({ data });
    return HosMapper.toResponseCreateHoDto(ho);
  }

  async createMany(items: { ten_khoa_hoc: string; ten_tieng_viet?: string; mo_ta?: string; ten_nganh_khoa_hoc: string }[]): Promise<ResponseCreateManyHoDto> {
    const createdHos = await this.prisma.ho.createManyAndReturn({ data: items });
    return HosMapper.toResponseCreateManyHoDto(createdHos);
  }

  async update(id: number, data: { ten_khoa_hoc?: string; ten_tieng_viet?: string; mo_ta?: string; ten_nganh_khoa_hoc?: string }): Promise<ResponseUpdateHoDto> {
    const ho = await this.prisma.ho.update({ 
      where: { id }, 
      data:{
        ...data,
        updated_at: new Date()
      } 
    });
    return HosMapper.toResponseUpdateHoDto(ho);
  }

  async remove(id: number): Promise<ResponseDeleteHoDto> {
    const ho = await this.prisma.ho.delete({ where: { id } });
    return HosMapper.toResponseDeleteHoDto(ho);
  }

  async allHos(filter: { ten_khoa_hoc?: string; ten_nganh_khoa_hoc?: string; page: number; limit: number }): Promise<ResponseAllHosDto> {
    const where = QueryBuilder.buildQueryFilter(filter.ten_khoa_hoc, filter.ten_nganh_khoa_hoc);
    const pagination = QueryBuilder.buildPageFilter(filter.page, filter.limit);
    
    const hos = await this.prisma.ho.findMany({
      where,
      ...pagination,
      include: {
        nganh: {
          select: {
            ten_khoa_hoc: true,
            ten_tieng_viet: true
          }
        },
        _count:{
          select:{
            loais:true
          }
        }
      },
      orderBy: {
        ten_khoa_hoc: 'asc'
      }
    });

    const total = await this.prisma.ho.count({
      where,
      ...pagination,
    });

    let n_pages = -1;
    if (filter.page === 1) {
      const allHosCount = await this.prisma.ho.count();
      n_pages = Math.ceil(allHosCount / filter.limit);
    }

    // Map the data to include loais_count
    const mappedData = hos.map(ho => ({
      ...ho,
      loais_count: ho._count.loais,
      _count: undefined 
    }));

    return HosMapper.toResponseAllHosDto(mappedData, total, n_pages !== -1 ? n_pages : undefined);
  }

}
