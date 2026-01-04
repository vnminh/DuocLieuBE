import {Vung_phan_bo} from '@prisma/duoclieu-client'

export class ResponseCreateVungPhanBoDto{
    message: string
    data: Vung_phan_bo
}

export class ResponseUpdateVungPhanBoDto{
    message: string
    data: Vung_phan_bo
}

export class ResponseSearchVungPhanBoDto{
    message: string
    data: Vung_phan_bo[]
}

export class ResponseDeleteVungPhanBoDto{
    message: string
    data: Vung_phan_bo
}

export class ResponseUniqueVungPhanBoDto{
    message: string
    data: Vung_phan_bo
}

export class ResponseCreateManyVungPhanBoDto {
    message: string
    data: Vung_phan_bo[]
}

export class ResponseAllVungPhanBoDto {
    message: string;
    data: {
        vungPhanBos: ResponseVungPhanBoDto[];
        total: number;
        pages?: number;
    }
}

export class ResponseVungPhanBoDto {
    id: number;
    ten_dia_phan_hanh_chinh: string;
    danh_sach_diem_bien: string | null;
    created_at: Date;
    updated_at: Date;
    vi_tri_dia_li_count: number
}
