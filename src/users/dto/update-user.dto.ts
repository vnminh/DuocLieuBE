import { Transform } from "class-transformer"
import { IsEmail, IsOptional, IsString } from "class-validator"
import { UserStatus } from "@prisma/duoclieu-client"

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