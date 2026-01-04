import { Vung_phan_bo } from '@prisma/duoclieu-client';
import {
  ResponseCreateVungPhanBoDto,
  ResponseUpdateVungPhanBoDto,
  ResponseSearchVungPhanBoDto,
  ResponseDeleteVungPhanBoDto,
  ResponseUniqueVungPhanBoDto,
  ResponseCreateManyVungPhanBoDto
} from '../dto/response-vung-phan-bo.dto';
import { ResponseAllVungPhanBoDto, ResponseVungPhanBoDto } from '../dto/response-vung-phan-bo.dto';

export class VungPhanBoMapper {
  static toResponseCreateVungPhanBoDto(data: Vung_phan_bo, message: string = 'Vùng phân bố đã được tạo thành công'): ResponseCreateVungPhanBoDto {
    return {
      message,
      data
    };
  }

  static toResponseUpdateVungPhanBoDto(data: Vung_phan_bo, message: string = 'Vùng phân bố đã được cập nhật thành công'): ResponseUpdateVungPhanBoDto {
    return {
      message,
      data
    };
  }

  static toResponseSearchVungPhanBoDto(data: Vung_phan_bo[], message: string = 'Danh sách vùng phân bố được tìm thấy'): ResponseSearchVungPhanBoDto {
    return {
      message,
      data
    };
  }

  static toResponseDeleteVungPhanBoDto(data: Vung_phan_bo, message: string = 'Vùng phân bố đã được xóa thành công'): ResponseDeleteVungPhanBoDto {
    return {
      message,
      data
    };
  }

  static toResponseUniqueVungPhanBoDto(data, message: string = 'Vùng phân bố được tìm thấy'): ResponseUniqueVungPhanBoDto {
    return {
      message,
      data
    };
  }

  static toResponseAllVungPhanBoDto(
    data: ResponseVungPhanBoDto[],
    total: number,
    pages?: number,
    message: string = 'Get all vung phan bo successfully'
  ): ResponseAllVungPhanBoDto {
    return {
      message,
      data: {
        vungPhanBos: data,
        total,
        pages
      }

    };
  }

  static toResponseCreateManyVungPhanBoDto(data: Vung_phan_bo[], message: string = 'Vùng phân bố đã được tạo thành công'): ResponseCreateManyVungPhanBoDto {
    return {
      message,
      data
    };
  }
}
