import { Transform } from "class-transformer";
import { IsInt, IsOptional, IsString, Min } from "class-validator";

export class SearchHoDto{
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
    ten_nganh_khoa_hoc: string
}

export class CreateHoDto {
  ten_khoa_hoc: string;
  ten_tieng_viet?: string;
  mo_ta?: string;
  ten_nganh_khoa_hoc: string;
}

export class UpdateHoDto {
  ten_khoa_hoc?: string;
  ten_tieng_viet?: string;
  mo_ta?: string;
  ten_nganh_khoa_hoc?: string;
}

export class CreateManyHoDto {
  data: CreateHoDto[];
}
