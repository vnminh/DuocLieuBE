import { Ho } from '@prisma/duoclieu-client'

export class ResponseCreateHoDto {
    message: string
    data: Ho
}

export class ResponseUpdateHoDto {
    message: string
    data: Ho
}

export class ResponseSearchHoDto {
    message: string
    data: Ho[]
}

export class ResponseDeleteHoDto {
    message: string
    data: Ho
}

export class ResponseUniqueHoDto {
    message: string
    data: Ho
}

export class ResponseCreateManyHoDto {
    message: string
    data: Ho[]
}