import { Transform, Type } from "class-transformer";
import { IsArray, IsInt, IsOptional, IsString, Min, ValidateNested } from "class-validator";

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
  @IsOptional()
  @IsString()
  ten_khoa_hoc: string;
  @IsOptional()
  @IsString()
  ten_tieng_viet?: string;
  @IsOptional()
  @IsString()
  mo_ta?: string;
  @IsOptional()
  @IsString()
  ten_nganh_khoa_hoc: string;
}

export class UpdateHoDto {
  @IsOptional()
  @IsString()
  ten_khoa_hoc?: string;
  @IsOptional()
  @IsString()
  ten_tieng_viet?: string;
  @IsOptional()
  @IsString()
  mo_ta?: string;
  @IsOptional()
  @IsString()
  ten_nganh_khoa_hoc?: string;
}

export class CreateManyHoDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateHoDto)
  data: CreateHoDto[];
}
