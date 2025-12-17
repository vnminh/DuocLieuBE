import { Loai } from '@prisma/duoclieu-client'

export class ResponseCreateLoaiDto {
    message: string
    data: Loai
}

export class ResponseUpdateLoaiDto {
    message: string
    data: Loai
}

export class ResponseSearchLoaiDto {
    message: string
    data: Loai[]
}

export class ResponseDeleteLoaiDto {
    message: string
    data: Loai
}

export class ResponseUniqueLoaiDto {
    message: string
    data: Loai
}

export class ResponseAllLoaisDto {
    message: string;
    data: {
        loais: ResponseLoaiDto[];
        total: number;
        pages?: number;
    }
}

export class ResponseLoaiDto {
    id: number;
    ten_khoa_hoc: string;
    ten_tieng_viet?: string;
    mo_ta?: string;
    ten_ho_khoa_hoc: string;
    ten_nganh_khoa_hoc: string;
    created_at: Date;
    updated_at: Date;
    ho?: {
        ten_khoa_hoc: string;
        ten_tieng_viet?: string;
        nganh?: {
            ten_khoa_hoc: string;
            ten_tieng_viet?: string;
        };
    };
}