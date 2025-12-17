import { Loai } from '@prisma/duoclieu-client';
import {
  ResponseCreateLoaiDto,
  ResponseUpdateLoaiDto,
  ResponseSearchLoaiDto,
  ResponseDeleteLoaiDto,
  ResponseUniqueLoaiDto
} from '../dto/response-loais.dto';
import { ResponseAllLoaisDto } from '../dto/response-loais.dto';

export class LoaisMapper {
  static toResponseCreateLoaiDto(data: Loai, message: string = 'Loài đã được tạo thành công'): ResponseCreateLoaiDto {
    return {
      message,
      data
    };
  }

  static toResponseUpdateLoaiDto(data: Loai, message: string = 'Loài đã được cập nhật thành công'): ResponseUpdateLoaiDto {
    return {
      message,
      data
    };
  }

  static toResponseSearchLoaiDto(data: Loai[], message: string = 'Danh sách loài được tìm thấy'): ResponseSearchLoaiDto {
    return {
      message,
      data
    };
  }

  static toResponseDeleteLoaiDto(data: Loai, message: string = 'Loài đã được xóa thành công'): ResponseDeleteLoaiDto {
    return {
      message,
      data
    };
  }

  static toResponseUniqueLoaiDto(data, message: string = 'Loài được tìm thấy'): ResponseUniqueLoaiDto {
    return {
      message,
      data
    };
  }

  static toResponseAllLoaisDto(
    data: any[], // Use any[] because we need the relation data
    total: number,
    pages?: number,
    message: string = 'Get all loais successfully'
  ): ResponseAllLoaisDto {
    return {
      message,
      data: {
        loais: data,
        total,
        pages
      }
    };
  }
}