import { User } from '@prisma/duoclieu-client'


export class ResponseCreateUserDto{
    message: string
    data: User 
}

export class ResponseUpdateUserDto{
    message: string
    data: User 
}
