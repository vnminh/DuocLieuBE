import { Ho } from '@prisma/duoclieu-client';
import {
  ResponseCreateHoDto,
  ResponseUpdateHoDto,
  ResponseSearchHoDto,
  ResponseDeleteHoDto,
  ResponseUniqueHoDto
} from '../dto/response-ho.dto';
import { ResponseAllHosDto } from '../dto/response-hos.dto';

export class HosMapper {
  static toResponseCreateHoDto(data: Ho, message: string = 'Họ đã được tạo thành công'): ResponseCreateHoDto {
    return {
      message,
      data
    };
  }

  static toResponseUpdateHoDto(data: Ho, message: string = 'Họ đã được cập nhật thành công'): ResponseUpdateHoDto {
    return {
      message,
      data
    };
  }

  static toResponseSearchHoDto(data: Ho[], message: string = 'Danh sách họ được tìm thấy'): ResponseSearchHoDto {
    return {
      message,
      data
    };
  }

  static toResponseDeleteHoDto(data: Ho, message: string = 'Họ đã được xóa thành công'): ResponseDeleteHoDto {
    return {
      message,
      data
    };
  }

  static toResponseUniqueHoDto(data, message: string = 'Họ được tìm thấy'): ResponseUniqueHoDto {
    return {
      message,
      data
    };
  }

  static toResponseAllHosDto(
    data: any[], // Use any[] because we need the relation data
    total: number,
    pages?: number,
    message: string = 'Get all hos successfully'
  ): ResponseAllHosDto {
    return {
      message,
      data: {
        hos: data,
        total,
        pages
      }
    };
  }
}