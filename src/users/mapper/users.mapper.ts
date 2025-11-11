import {User} from '@prisma/duoclieu-client'
import { ResponseCreateUserDto } from '../dto/response-user.dto'
export class UsersMapper{

    static toResponseCreateUserDto(data: User, message:string="User được tạo mới thành công"): ResponseCreateUserDto{
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
}