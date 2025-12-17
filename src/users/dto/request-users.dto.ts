import { Transform } from "class-transformer"
import { IsEmail, IsEnum, IsInt, IsOptional, IsString } from "class-validator"
import { UserStatus, VerificationPurpose, UserRole } from "@prisma/duoclieu-client"

export class CreateUserDto{
    @IsString()
    full_name:string

    @IsEmail()
    email:string
    
    @IsString()
    password:string         

    @IsEnum(UserRole)
    role: UserRole

    @IsString()
    @IsOptional()
    address?:string
    
    @IsOptional()
    date_of_birth?:string      
    
    @IsOptional()
    gender?:"Male"|"Female"|"Other"
    
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

    @IsEnum(UserRole)
    @IsOptional()
    role?: UserRole

    @IsString()
    @IsOptional()
    address?:string
    
    @IsOptional()
    date_of_birth?:string      
    
    @IsOptional()
    gender?:"Male"|"Female"|"Other"
    
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

export class CreateManyUserDto {
    data: CreateUserDto[];
}