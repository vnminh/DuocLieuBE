import { Transform } from "class-transformer";
import { IsInt, IsOptional, IsString, Min } from "class-validator";

export class SearchLoaiDto{
    @IsOptional()
    @Transform(({value})=>parseInt(value))
    @IsInt()
    @Min(1)
    page: number;

    @IsOptional()
    @Transform(({value})=>parseInt(value))
    @IsInt()
    @Min(1)
    limit: number;

    @IsOptional()
    @IsString()
    ten_khoa_hoc: string

    @IsOptional()
    @IsString()
    ten_ho_khoa_hoc: string

    @IsOptional()
    @IsString()
    ten_nganh_khoa_hoc: string
}