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