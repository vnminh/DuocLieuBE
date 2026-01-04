import { Transform, Type } from "class-transformer";
import { IsArray, IsInt, IsNumber, IsOptional, IsString, Min, ValidateNested } from "class-validator";

export class CreateLoaiDto {
  @IsOptional()
  @IsString()
  ten_khoa_hoc: string;
  @IsOptional()
  @IsString()
  ten_tieng_viet?: string;
  @IsOptional()
  @IsString()
  ten_goi_khac?: string;
  @IsOptional()
  @IsString()
  ten_ho_khoa_hoc: string;
}

export class UpdateLoaiDto {
  
  @IsOptional()
  @IsString()
  ten_khoa_hoc?: string;
  @IsOptional()
  @IsString()
  ten_tieng_viet?: string;
  @IsOptional()
  @IsString()
  ten_goi_khac?: string;
  @IsOptional()
  @IsString()
  ten_ho_khoa_hoc?: string;
}

// Extended DTO for creating loai with all nested data
export class CreateLoaiWithDetailsDto {
  // Loai fields
  @IsString()
  ten_khoa_hoc: string;
  @IsOptional()
  @IsString()
  ten_tieng_viet?: string;
  @IsOptional()
  @IsString()
  ten_goi_khac?: string;
  @IsString()
  ten_ho_khoa_hoc: string;

  // Dac_diem_sinh_hoc fields
  @IsOptional()
  @IsString()
  dac_diem_mo_ta?: string;
  @IsOptional()
  @IsString()
  dang_song?: string;
  @IsOptional()
  @IsString()
  tru_luong?: string;
  muc_do_quy_hiem?: string;
  @IsOptional()
  @IsString()
  phuong_an_bao_ton?: string;

  // Khai_thac_va_che_bien fields
  @IsOptional()
  @IsString()
  chi_tiet_ky_thuat?: string;
  @IsOptional()
  @IsString()
  hien_trang_gay_trong_phat_trien?: string;
  @IsOptional()
  @IsString()
  ky_thuat_trong_cham_soc_thu_hoach?: string;

  // Hinh_anh fields
  @IsOptional()
  @IsString()
  collection_uri?: string;

  // Cong_dung_va_thanh_phan_hoa_hoc fields (can have multiple)
  @IsArray()
  @Transform(({ value }) => {
    if (Array.isArray(value)) {
      return value.map(v => String(v).trim());
    }
    if (typeof value === 'string') {
      return value
        .split(',')
        .map(v => v.trim())
        .filter(v => v.length > 0);
    }
    return [];
  })
  @IsString({ each: true })
  bo_phan_su_dung?: string[];
  @IsArray()
  @Transform(({ value }) => {
    if (Array.isArray(value)) {
      return value.map(v => String(v).trim());
    }
    if (typeof value === 'string') {
      return value
        .split(',')
        .map(v => v.trim())
        .filter(v => v.length > 0);
    }
    return [];
  })
  @IsString({ each: true })
  cong_dung?: string[];
  @IsArray()
  @Transform(({ value }) => {
    if (Array.isArray(value)) {
      return value.map(v => String(v).trim());
    }
    if (typeof value === 'string') {
      return value
        .split(',')
        .map(v => v.trim())
        .filter(v => v.length > 0);
    }
    return [];
  })
  @IsString({ each: true })
  bai_thuoc?: string[];
  @IsArray()
  @Transform(({ value }) => {
    if (Array.isArray(value)) {
      return value.map(v => String(v).trim());
    }
    if (typeof value === 'string') {
      return value
        .split(',')
        .map(v => v.trim())
        .filter(v => v.length > 0);
    }
    return [];
  })
  @IsString({ each: true })
  tac_dung_duoc_ly?: string[];

  // Vi_tri_dia_li fields (can have multiple)
  @IsArray()
  @Transform(({ value }) => {
    if (Array.isArray(value)) {
      return value.map(v => Number(v));
    }
    if (typeof value === 'string') {
      return value.split(',').map(v => Number(v.trim()));
    }
    return [];
  })
  @IsNumber({}, { each: true })
  kinh_do?: number[];
  @IsArray()
  @Transform(({ value }) => {
    if (Array.isArray(value)) {
      return value.map(v => Number(v));
    }
    if (typeof value === 'string') {
      return value.split(',').map(v => Number(v.trim()));
    }
    return [];
  })
  @IsNumber({}, { each: true })
  vi_do?: number[];
  @IsArray()
  @Transform(({ value }) => {
    if (Array.isArray(value)) {
      return value.map(v => Number(v));
    }
    if (typeof value === 'string') {
      return value.split(',').map(v => Number(v.trim()));
    }
    return [];
  })
  @IsNumber({}, { each: true })
  id_vung_phan_bo?: number[];
}

export class CreateManyLoaiDto {
  data: CreateLoaiDto[];
}

export class CreateManyLoaiWithDetailsDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateLoaiWithDetailsDto)
  data: CreateLoaiWithDetailsDto[];
}

export class SearchLoaiDto{
  @IsOptional()
  @Transform(({value})=>parseInt(value))
  @IsInt()
  @Min(1)
  page: number;

  @IsOptional()
  @Transform(({value})=>parseInt(value))
  @IsInt()
  @Min(1)
  limit: number;

  @IsOptional()
  @IsString()
  ten_khoa_hoc: string

  @IsOptional()
  @IsString()
  ten_ho_khoa_hoc: string

  @IsOptional()
  @IsString()
  ten_nganh_khoa_hoc: string
}