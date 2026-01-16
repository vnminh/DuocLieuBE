import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { QueryBuilder } from './utils/queryBuilder';
import { VungPhanBoMapper } from './mapper/vung-phan-bo.mapper';
import {
  ResponseCreateVungPhanBoDto,
  ResponseUpdateVungPhanBoDto,
  ResponseSearchVungPhanBoDto,
  ResponseDeleteVungPhanBoDto,
  ResponseCreateManyVungPhanBoDto,
  ResponseMapDataDto,
  ResponseLoaisWithCoordinatesDto,
} from './dto/response-vung-phan-bo.dto';
import { ResponseAllVungPhanBoDto } from './dto/response-vung-phan-bo.dto';

@Injectable()
export class VungPhanBoService {
  constructor(private readonly prisma: PrismaService) {}

  getHello(): string {
    return 'From Vung Phan Bo Service, Hello World!';
  }

  async findOneById(id: number) {
    const vungPhanBo = await this.prisma.vung_phan_bo.findUnique({
      where: { id },
    });
    if (!vungPhanBo) return null;
    return VungPhanBoMapper.toResponseUniqueVungPhanBoDto(vungPhanBo);
  }

  async findOneByIdWithRelations(id: number) {
    const vungPhanBo = await this.prisma.vung_phan_bo.findUnique({
      where: { id },
      include: {
        vi_tri_dia_li: {
          select: {
            id: true,
            kinh_do: true,
            vi_do: true,
            loai: {
              select: {
                id: true,
                ten_khoa_hoc: true,
                ten_tieng_viet: true,
                ten_goi_khac: true,
                dac_diem_sinh_hoc: {
                  select: {
                    muc_do_quy_hiem: true,
                  },
                },
              },
            },
          },
          orderBy: {
            id: 'asc',
          },
        },
        _count: {
          select: {
            vi_tri_dia_li: true,
          },
        },
      },
    });

    if (!vungPhanBo) return null;

    // Group vi_tri_dia_li by loai to get unique loais with their coordinates
    const loaisMap = new Map<
      number,
      {
        id: number;
        ten_khoa_hoc: string;
        ten_tieng_viet: string | null;
        ten_goi_khac: string | null;
        muc_do_quy_hiem: string | null;
        coordinates: { id: number; kinh_do: number; vi_do: number }[];
      }
    >();

    vungPhanBo.vi_tri_dia_li.forEach((vtdl) => {
      const loaiId = vtdl.loai.id;
      if (!loaisMap.has(loaiId)) {
        loaisMap.set(loaiId, {
          id: vtdl.loai.id,
          ten_khoa_hoc: vtdl.loai.ten_khoa_hoc,
          ten_tieng_viet: vtdl.loai.ten_tieng_viet,
          ten_goi_khac: vtdl.loai.ten_goi_khac,
          muc_do_quy_hiem: vtdl.loai.dac_diem_sinh_hoc?.muc_do_quy_hiem || null,
          coordinates: [],
        });
      }
      loaisMap.get(loaiId)!.coordinates.push({
        id: vtdl.id,
        kinh_do: vtdl.kinh_do,
        vi_do: vtdl.vi_do,
      });
    });

    return {
      message: 'Vung Phan Bo detail retrieved successfully',
      data: {
        id: vungPhanBo.id,
        ten_dia_phan_hanh_chinh: vungPhanBo.ten_dia_phan_hanh_chinh,
        danh_sach_diem_bien: vungPhanBo.danh_sach_diem_bien,
        created_at: vungPhanBo.created_at,
        updated_at: vungPhanBo.updated_at,
        loais: Array.from(loaisMap.values()),
        loais_count: loaisMap.size,
        vi_tri_dia_li_count: vungPhanBo._count.vi_tri_dia_li,
      },
    };
  }

  async findByTenDiaPhanHanhChinh(ten_dia_phan_hanh_chinh: string) {
    const vungPhanBo = await this.prisma.vung_phan_bo.findFirst({
      where: {
        ten_dia_phan_hanh_chinh: {
          equals: ten_dia_phan_hanh_chinh,
          mode: 'insensitive',
        },
      },
    });
    if (!vungPhanBo) return null;
    return VungPhanBoMapper.toResponseUniqueVungPhanBoDto(vungPhanBo);
  }

  async create(data: {
    ten_dia_phan_hanh_chinh: string;
    danh_sach_diem_bien?: string;
  }): Promise<ResponseCreateVungPhanBoDto> {
    const vungPhanBo = await this.prisma.vung_phan_bo.create({
      data: {
        ...data,
        updated_at: new Date(),
      },
    });
    return VungPhanBoMapper.toResponseCreateVungPhanBoDto(vungPhanBo);
  }

  async createMany(
    items: { ten_dia_phan_hanh_chinh: string; danh_sach_diem_bien?: string }[],
  ): Promise<ResponseCreateManyVungPhanBoDto> {
    const createdVungPhanBos =
      await this.prisma.vung_phan_bo.createManyAndReturn({ data: items });
    return VungPhanBoMapper.toResponseCreateManyVungPhanBoDto(
      createdVungPhanBos,
    );
  }

  async update(
    id: number,
    data: { ten_dia_phan_hanh_chinh?: string; danh_sach_diem_bien?: string },
  ): Promise<ResponseUpdateVungPhanBoDto> {
    const vungPhanBo = await this.prisma.vung_phan_bo.update({
      where: { id },
      data,
    });
    return VungPhanBoMapper.toResponseUpdateVungPhanBoDto(vungPhanBo);
  }

  async remove(id: number): Promise<ResponseDeleteVungPhanBoDto> {
    const vungPhanBo = await this.prisma.vung_phan_bo.delete({ where: { id } });
    return VungPhanBoMapper.toResponseDeleteVungPhanBoDto(vungPhanBo);
  }

  async allVungPhanBos(filter: {
    ten_dia_phan_hanh_chinh?: string;
    page: number;
    limit: number;
  }): Promise<ResponseAllVungPhanBoDto> {
    const where = QueryBuilder.buildAllVungPhanBoFilter(
      filter.ten_dia_phan_hanh_chinh,
    );
    const pagination = QueryBuilder.buildPageFilter(filter.page, filter.limit);

    const all = await this.prisma.vung_phan_bo.findMany({
      where,
      ...pagination,
      include: {
        _count: {
          select: {
            vi_tri_dia_li: true,
          },
        },
      },
      orderBy: {
        ten_dia_phan_hanh_chinh: 'asc',
      },
    });

    const total = await this.prisma.vung_phan_bo.count({
      where,
      ...pagination,
    });

    let n_pages = -1;
    if (filter.page === 1) {
      const allVungPhanBoCount = await this.prisma.vung_phan_bo.count();
      n_pages = Math.ceil(allVungPhanBoCount / filter.limit);
    }

    const mappedData = all.map((vungPhanBo) => ({
      ...vungPhanBo,
      vi_tri_dia_li_count: vungPhanBo._count.vi_tri_dia_li,
      _count: undefined,
    }));

    return VungPhanBoMapper.toResponseAllVungPhanBoDto(
      mappedData,
      total,
      n_pages !== -1 ? n_pages : undefined,
    );
  }

  // Map-related methods
  async getMapData(): Promise<ResponseMapDataDto> {
    const vungPhanBos = await this.prisma.vung_phan_bo.findMany({
      include: {
        _count: {
          select: {
            vi_tri_dia_li: true,
          },
        },
      },
      orderBy: {
        ten_dia_phan_hanh_chinh: 'asc',
      },
    });

    return VungPhanBoMapper.toResponseMapDataDto(vungPhanBos);
  }

  async getLoaisWithCoordinatesByVungPhanBo(
    id: number,
  ): Promise<ResponseLoaisWithCoordinatesDto | null> {
    const vungPhanBo = await this.prisma.vung_phan_bo.findUnique({
      where: { id },
    });

    if (!vungPhanBo) return null;

    // Get all loais that have vi_tri_dia_li belonging to this vung_phan_bo
    const loais = await this.prisma.loai.findMany({
      where: {
        vi_tri_dia_li: {
          some: {
            id_vung_phan_bo: id,
          },
        },
      },
      include: {
        vi_tri_dia_li: {
          where: {
            id_vung_phan_bo: id,
          },
          select: {
            id: true,
            kinh_do: true,
            vi_do: true,
          },
        },
        dac_diem_sinh_hoc: {
          select: {
            muc_do_quy_hiem: true,
          },
        },
      },
      orderBy: {
        ten_khoa_hoc: 'asc',
      },
    });

    return VungPhanBoMapper.toResponseLoaisWithCoordinatesDto(
      vungPhanBo,
      loais,
    );
  }

  async getAllLoaisWithCoordinates(): Promise<any> {
    const loais = await this.prisma.loai.findMany({
      where: {
        vi_tri_dia_li: {
          some: {},
        },
      },
      include: {
        vi_tri_dia_li: {
          select: {
            id: true,
            kinh_do: true,
            vi_do: true,
            id_vung_phan_bo: true,
          },
        },
        dac_diem_sinh_hoc: {
          select: {
            muc_do_quy_hiem: true,
          },
        },
      },
      orderBy: {
        ten_khoa_hoc: 'asc',
      },
    });

    return {
      message: 'Lấy tất cả loài có tọa độ thành công',
      data: loais.map((loai) =>
        VungPhanBoMapper.toLoaiWithCoordinatesDto(loai),
      ),
      total: loais.length,
    };
  }
}
