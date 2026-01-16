import { Vung_phan_bo } from '@prisma/duoclieu-client';

export class ResponseCreateVungPhanBoDto {
  message: string;
  data: Vung_phan_bo;
}

export class ResponseUpdateVungPhanBoDto {
  message: string;
  data: Vung_phan_bo;
}

export class ResponseSearchVungPhanBoDto {
  message: string;
  data: Vung_phan_bo[];
}

export class ResponseDeleteVungPhanBoDto {
  message: string;
  data: Vung_phan_bo;
}

export class ResponseUniqueVungPhanBoDto {
  message: string;
  data: Vung_phan_bo;
}

export class ResponseCreateManyVungPhanBoDto {
  message: string;
  data: Vung_phan_bo[];
}

export class ResponseAllVungPhanBoDto {
  message: string;
  data: {
    vungPhanBos: ResponseVungPhanBoDto[];
    total: number;
    pages?: number;
  };
}

export class ResponseVungPhanBoDto {
  id: number;
  ten_dia_phan_hanh_chinh: string;
  danh_sach_diem_bien: string | null;
  created_at: Date;
  updated_at: Date;
  vi_tri_dia_li_count: number;
}

// Map-related DTOs
export class VungPhanBoMapDataDto {
  id: number;
  ten_dia_phan_hanh_chinh: string;
  danh_sach_diem_bien: number[][] | null; // Parsed coordinates [[lon, lat], ...]
  center: [number, number] | null; // Center point for zooming [lon, lat]
  loai_count: number;
}

export class ResponseMapDataDto {
  message: string;
  data: VungPhanBoMapDataDto[];
}

export class LoaiWithCoordinatesDto {
  id: number;
  ten_khoa_hoc: string;
  ten_tieng_viet: string | null;
  ten_goi_khac: string | null;
  ten_ho_khoa_hoc: string;
  vi_tri_dia_li: {
    id: number;
    kinh_do: number;
    vi_do: number;
  }[];
  dac_diem_sinh_hoc?: {
    muc_do_quy_hiem: string;
  };
}

export class ResponseLoaisWithCoordinatesDto {
  message: string;
  data: {
    vung_phan_bo: {
      id: number;
      ten_dia_phan_hanh_chinh: string;
      danh_sach_diem_bien: number[][] | null;
      center: [number, number] | null;
    };
    loais: LoaiWithCoordinatesDto[];
    total: number;
  };
}
