export class ResponseAllHosDto {
    message: string;
    data: {
        hos: ResponseHoDto[];
        total: number;
        pages?: number;
    }
}

export class ResponseHoDto {
    id: number;
    ten_khoa_hoc: string;
    ten_tieng_viet?: string;
    mo_ta?: string;
    ten_nganh_khoa_hoc: string;
    created_at: Date;
    updated_at: Date;
    nganh?: {
        ten_khoa_hoc: string;
        ten_tieng_viet?: string;
    };
    loais_count?: number;
}