import { Transform } from "class-transformer";
import { IsInt, IsOptional, IsString, Min } from "class-validator";

export class CreateNganhDto {
  ten_khoa_hoc: string;
  ten_tieng_viet?: string;
  mo_ta?: string;
}

export class UpdateNganhDto {
  ten_khoa_hoc?: string;
  ten_tieng_viet?: string;
  mo_ta?: string;
}

export class CreateManyNganhDto {
  data: CreateNganhDto[];
}

export class SearchNganhDto{
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
}