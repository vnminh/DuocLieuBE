import { Nganh } from '@prisma/duoclieu-client';
import {
  ResponseCreateNganhDto,
  ResponseUpdateNganhDto,
  ResponseSearchNganhDto,
  ResponseDeleteNganhDto,
  ResponseUniqueNganhDto
} from '../dto/response-nganhs.dto';
import { ResponseAllNganhsDto, ResponseNganhDto } from '../dto/response-nganhs.dto';

export class NganhsMapper {
  static toResponseCreateNganhDto(data: Nganh, message: string = 'Ngành đã được tạo thành công'): ResponseCreateNganhDto {
    return {
      message,
      data
    };
  }

  static toResponseUpdateNganhDto(data: Nganh, message: string = 'Ngành đã được cập nhật thành công'): ResponseUpdateNganhDto {
    return {
      message,
      data
    };
  }

  static toResponseSearchNganhDto(data: Nganh[], message: string = 'Danh sách ngành được tìm thấy'): ResponseSearchNganhDto {
    return {
      message,
      data
    };
  }

  static toResponseDeleteNganhDto(data: Nganh, message: string = 'Ngành đã được xóa thành công'): ResponseDeleteNganhDto {
    return {
      message,
      data
    };
  }

  static toResponseUniqueNganhDto(data, message: string = 'Ngành được tìm thấy'): ResponseUniqueNganhDto {
    return {
      message,
      data
    };
  }

  static toResponseAllNganhsDto(
    data: ResponseNganhDto[],
    total: number,
    pages?: number,
    message: string = 'Get all nganhs successfully'
  ): ResponseAllNganhsDto {
    return {
      message,
      data: {
        nganhs: data,
        total,
        pages
      }

    };
  }
}