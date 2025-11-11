import { Transform, Type } from "class-transformer"
import { IsDate, IsEmail, IsOptional, IsString } from "class-validator"
import { UserStatus } from "@prisma/duoclieu-client"

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