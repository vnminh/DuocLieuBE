import { Transform } from "class-transformer";
import { IsInt, IsOptional, IsString, Min } from "class-validator";

export class CreateLoaiDto {
  ten_khoa_hoc: string;
  ten_tieng_viet?: string;
  ten_goi_khac?: string;
  ten_ho_khoa_hoc: string;
}

export class UpdateLoaiDto {
  ten_khoa_hoc?: string;
  ten_tieng_viet?: string;
  ten_goi_khac?: string;
  ten_ho_khoa_hoc?: string;
}

// Extended DTO for creating loai with all nested data
export class CreateLoaiWithDetailsDto {
  // Loai fields
  ten_khoa_hoc: string;
  ten_tieng_viet?: string;
  ten_goi_khac?: string;
  ten_ho_khoa_hoc: string;

  // Dac_diem_sinh_hoc fields
  dac_diem_mo_ta?: string;
  dang_song?: string;
  tru_luong?: string;
  muc_do_quy_hiem?: string;
  phuong_an_bao_ton?: string;

  // Khai_thac_va_che_bien fields
  chi_tiet_ky_thuat?: string;
  hien_trang_gay_trong_phat_trien?: string;
  ky_thuat_trong_cham_soc_thu_hoach?: string;

  // Hinh_anh fields
  collection_uri?: string;

  // Cong_dung_va_thanh_phan_hoa_hoc fields (can have multiple)
  bo_phan_su_dung?: string[];
  cong_dung?: string[];
  bai_thuoc?: string[];
  tac_dung_duoc_ly?: string[];

  // Vi_tri_dia_li fields (can have multiple)
  kinh_do?: number[];
  vi_do?: number[];
  id_vung_phan_bo?: number[];
}

export class CreateManyLoaiDto {
  data: CreateLoaiDto[];
}

export class CreateManyLoaiWithDetailsDto {
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