import {Nganh} from '@prisma/duoclieu-client'

export class ResponseCreateNganhDto{
    message: string
    data: Nganh
}

export class ResponseUpdateNganhDto{
    message: string
    data: Nganh
}

export class ResponseSearchNganhDto{
    message: string
    data: Nganh[]
}

export class ResponseDeleteNganhDto{
    message: string
    data: Nganh
}

export class ResponseUniqueNganhDto{
    message: string
    data: Nganh
}

export class ResponseAllNganhsDto {
    message: string;
    data: {
        nganhs: ResponseNganhDto[];
        total: number;
        pages?: number;
    }
}

export class ResponseNganhDto {
    id: number;
    ten_khoa_hoc: string;
    ten_tieng_viet: string | null;
    mo_ta: string | null;
    created_at: Date;
    updated_at: Date;
    hos_count: number
}