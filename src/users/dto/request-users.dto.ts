import { Transform } from "class-transformer"
import { IsEmail, IsInt, IsOptional, IsString } from "class-validator"
import { UserStatus, VerificationPurpose } from "@prisma/duoclieu-client"

export class CreateUserDto{
    @IsString()
    full_name:string

    @IsEmail()
    email:string
    
    @IsString()
    password:string         

    @Transform(({value})=>parseInt(value))
    role_id: number

    @IsString()
    @IsOptional()
    address?:string
    
    @IsOptional()
    date_of_birth?:string      
    
    @IsOptional()
    gender?:"Male"|"Female"
    
    @IsOptional()
    avatar?:string             
    
    status:UserStatus = UserStatus.ACTIVE 
}

export class UpdateUserDto{
    @IsString()
    @IsOptional()
    full_name?:string

    @IsEmail()
    @IsOptional()
    email?:string
    
    @IsString()
    @IsOptional()
    old_password?:string

    @IsString()
    @IsOptional()
    new_password?:string         

    @Transform(({value})=>parseInt(value))
    role_id?: number

    @IsString()
    @IsOptional()
    address?:string
    
    @IsOptional()
    date_of_birth?:string      
    
    @IsOptional()
    gender?:"Male"|"Female"
    
    @IsOptional()
    avatar?:string             
    

    @IsOptional()
    status?:UserStatus = UserStatus.ACTIVE 
}

export class LoginDto{
    @IsEmail()
    email: string

    @IsString()
    password: string

}

export class ForgotPasswordDto{
    @IsEmail()
    email: string
}

export class VerifyCodeDto{
    @Transform(({value})=>parseInt(value))
    @IsInt()
    user_id:number

    @IsString()
    verification_code: string

    purpose: VerificationPurpose
}