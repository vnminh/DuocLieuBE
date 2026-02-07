import { Vung_phan_bo } from '@prisma/duoclieu-client';
import {
  ResponseCreateVungPhanBoDto,
  ResponseUpdateVungPhanBoDto,
  ResponseSearchVungPhanBoDto,
  ResponseDeleteVungPhanBoDto,
  ResponseUniqueVungPhanBoDto,
  ResponseCreateManyVungPhanBoDto,
  VungPhanBoMapDataDto,
  ResponseMapDataDto,
  LoaiWithCoordinatesDto,
  ResponseLoaisWithCoordinatesDto,
} from '../dto/response-vung-phan-bo.dto';
import {
  ResponseAllVungPhanBoDto,
  ResponseVungPhanBoDto,
} from '../dto/response-vung-phan-bo.dto';

export class VungPhanBoMapper {
  static toResponseCreateVungPhanBoDto(
    data: Vung_phan_bo,
    message: string = 'Vùng phân bố đã được tạo thành công',
  ): ResponseCreateVungPhanBoDto {
    return {
      message,
      data,
    };
  }

  static toResponseUpdateVungPhanBoDto(
    data: Vung_phan_bo,
    message: string = 'Vùng phân bố đã được cập nhật thành công',
  ): ResponseUpdateVungPhanBoDto {
    return {
      message,
      data,
    };
  }

  static toResponseSearchVungPhanBoDto(
    data: Vung_phan_bo[],
    message: string = 'Danh sách vùng phân bố được tìm thấy',
  ): ResponseSearchVungPhanBoDto {
    return {
      message,
      data,
    };
  }

  static toResponseDeleteVungPhanBoDto(
    data: Vung_phan_bo,
    message: string = 'Vùng phân bố đã được xóa thành công',
  ): ResponseDeleteVungPhanBoDto {
    return {
      message,
      data,
    };
  }

  static toResponseUniqueVungPhanBoDto(
    data,
    message: string = 'Vùng phân bố được tìm thấy',
  ): ResponseUniqueVungPhanBoDto {
    return {
      message,
      data,
    };
  }

  static toResponseAllVungPhanBoDto(
    data: ResponseVungPhanBoDto[],
    total: number,
    pages?: number,
    message: string = 'Get all vung phan bo successfully',
  ): ResponseAllVungPhanBoDto {
    return {
      message,
      data: {
        vungPhanBos: data,
        total,
        pages,
      },
    };
  }

  static toResponseCreateManyVungPhanBoDto(
    data: Vung_phan_bo[],
    message: string = 'Vùng phân bố đã được tạo thành công',
  ): ResponseCreateManyVungPhanBoDto {
    return {
      message,
      data,
    };
  }

  // Helper to parse danh_sach_diem_bien string to coordinates array
  static parseBoundaryCoordinates(
    danhSachDiemBien: string | null,
  ): number[][] | null {
    if (!danhSachDiemBien) return null;
    try {
      const parsed = danhSachDiemBien
      .trim()
      .split(';')
      .map(
        coord=>coord
        .trim()
        .split(',')
        .map(part_coord=>Number.parseFloat(part_coord.trim()))
      );
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
      return null;
    } catch {
      return null;
    }
  }

  // Calculate center point from boundary coordinates
  static calculateCenter(
    coordinates: number[][] | null,
  ): [number, number] | null {
    if (!coordinates || coordinates.length === 0) return null;

    const sumLon = coordinates.reduce((sum, coord) => sum + coord[0], 0);
    const sumLat = coordinates.reduce((sum, coord) => sum + coord[1], 0);

    return [sumLon / coordinates.length, sumLat / coordinates.length];
  }

  static toVungPhanBoMapDataDto(vungPhanBo: any): VungPhanBoMapDataDto {
    const coordinates = this.parseBoundaryCoordinates(
      vungPhanBo.danh_sach_diem_bien,
    );
    const center = this.calculateCenter(coordinates);

    return {
      id: vungPhanBo.id,
      ten_dia_phan_hanh_chinh: vungPhanBo.ten_dia_phan_hanh_chinh,
      danh_sach_diem_bien: coordinates,
      center,
      loai_count: vungPhanBo._count?.vi_tri_dia_li || 0,
    };
  }

  static toResponseMapDataDto(
    data: any[],
    message: string = 'Lấy dữ liệu bản đồ thành công',
  ): ResponseMapDataDto {
    return {
      message,
      data: data.map((vung) => this.toVungPhanBoMapDataDto(vung)),
    };
  }

  static toLoaiWithCoordinatesDto(loai: any): LoaiWithCoordinatesDto {
    return {
      id: loai.id,
      ten_khoa_hoc: loai.ten_khoa_hoc,
      ten_tieng_viet: loai.ten_tieng_viet,
      ten_goi_khac: loai.ten_goi_khac,
      ten_ho_khoa_hoc: loai.ten_ho_khoa_hoc,
      ho: loai.ho
        ? {
            ten_khoa_hoc: loai.ho.ten_khoa_hoc,
            ten_tieng_viet: loai.ho.ten_tieng_viet,
            nganh: loai.ho.nganh
              ? {
                  ten_khoa_hoc: loai.ho.nganh.ten_khoa_hoc,
                  ten_tieng_viet: loai.ho.nganh.ten_tieng_viet,
                }
              : undefined,
          }
        : undefined,
      vi_tri_dia_li:
        loai.vi_tri_dia_li?.map((vt: any) => ({
          id: vt.id,
          kinh_do: vt.kinh_do,
          vi_do: vt.vi_do,
        })) || [],
      dac_diem_sinh_hoc: loai.dac_diem_sinh_hoc
        ? {
            muc_do_quy_hiem: loai.dac_diem_sinh_hoc.muc_do_quy_hiem,
          }
        : undefined,
    };
  }

  static toResponseLoaisWithCoordinatesDto(
    vungPhanBo: any,
    loais: any[],
    message: string = 'Lấy danh sách loài theo vùng phân bố thành công',
  ): ResponseLoaisWithCoordinatesDto {
    const coordinates = this.parseBoundaryCoordinates(
      vungPhanBo.danh_sach_diem_bien,
    );
    const center = this.calculateCenter(coordinates);

    return {
      message,
      data: {
        vung_phan_bo: {
          id: vungPhanBo.id,
          ten_dia_phan_hanh_chinh: vungPhanBo.ten_dia_phan_hanh_chinh,
          danh_sach_diem_bien: coordinates,
          center,
        },
        loais: loais.map((loai) => this.toLoaiWithCoordinatesDto(loai)),
        total: loais.length,
      },
    };
  }
}
