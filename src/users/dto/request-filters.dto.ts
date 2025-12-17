import { Transform } from "class-transformer";
import { IsEnum, IsInt, IsOptional, IsString } from "class-validator";
import {UserStatus} from '@prisma/duoclieu-client'

export class SearchFilterDto{

    @IsString()
    @IsOptional()
    emailOrNamePattern: string

    @IsString()
    @IsOptional()
    @IsEnum(UserStatus)
    status: string

    @Transform(({value})=>parseInt(value))
    @IsInt()
    page: number

    @Transform(({value})=>parseInt(value))
    @IsInt()
    limit: number
}