import {User, VerificationCode, VerificationPurpose} from '@prisma/duoclieu-client'
import { ResponseAllUserDto, ResponseCreateUserDto, ResponseForgotPasswordDto, ResponseLoginDto, ResponseVerifyCodeDto, ResponseCreateManyUserDto } from '../dto/response-user.dto'
import { CreateEmailResponseSuccess } from 'resend'
export class UsersMapper{

    static toResponseCreateUserDto(data: User, message:string="User được tạo mới thành công"): ResponseCreateUserDto{
        return {
            message,
            data
        }
    }

    static toResponseLoginDto(data: User, message:string="User đăng nhập thành công"): ResponseLoginDto{
        return {
            message,
            data
        }
    }

    static toResponseUpdateUserDto(data: User, message:string="User được cập nhật thành công"): ResponseCreateUserDto{
        return {
            message,
            data
        }
    }

    static toResponseForgotPasswordDto(verificationCode: VerificationCode, emailResponse: CreateEmailResponseSuccess, message:string="Email reset password được gửi thành công"): ResponseForgotPasswordDto{
        return {
            message,
            data:{
                verificationCode,
                emailResponse,
            }
        }
    }

    static toResponseVerifyCodeDto(data: User, purpose: VerificationPurpose): ResponseVerifyCodeDto{
        if (purpose===VerificationPurpose.PASSWORD_RESET){
            return {
                message:'Reset password thành công',
                data
            }
        }
        else{
            return {
                message:'Xác nhận email thành công',
                data
            }
        }
    }

    static toResponseAllUserDto(data: User[], total:number, n_pages?:number, message:string='get all users successfully'): ResponseAllUserDto{
        return {
            message,
            data:{
                allUser: data,
                total,
                n_pages
            }
        }
        
    }

    static toResponseCreateManyUserDto(data: User[], message:string="Users được tạo mới thành công"): ResponseCreateManyUserDto{
        return {
            message,
            data
        }
    }
}