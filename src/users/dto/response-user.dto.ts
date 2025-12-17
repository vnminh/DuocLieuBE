import { User, VerificationCode } from '@prisma/duoclieu-client'
import { CreateEmailResponseSuccess } from 'resend'


export class ResponseCreateUserDto{
    message: string
    data: User 
}

export class ResponseUpdateUserDto{
    message: string
    data: User 
}

export class ResponseLoginDto{
    message: string
    data: User 
}

export class ResponseForgotPasswordDto{
    message: string
    data: {
        verificationCode: VerificationCode,
        emailResponse: CreateEmailResponseSuccess
    }
}

export class ResponseVerifyCodeDto{
    message: string
    data: User 
}

export class ResponseAllUserDto{
    message: string
    data: {
        allUser: User[],
        total: number,
        n_pages?:number,
    }
}