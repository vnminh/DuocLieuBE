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