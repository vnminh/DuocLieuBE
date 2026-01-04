import { Transform, Type } from "class-transformer";
import { IsArray, IsInt, IsOptional, IsString, Min, ValidateNested } from "class-validator";

export class CreateVungPhanBoDto {
  @IsString()
  ten_dia_phan_hanh_chinh: string;
  
  @IsOptional()
  @IsString()
  danh_sach_diem_bien?: string;
}

export class UpdateVungPhanBoDto {
  @IsOptional()
  @IsString()
  ten_dia_phan_hanh_chinh?: string;
  
  @IsOptional()
  @IsString()
  danh_sach_diem_bien?: string;
}

export class CreateManyVungPhanBoDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateVungPhanBoDto)
  data: CreateVungPhanBoDto[];
}

export class SearchVungPhanBoDto{
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
    ten_dia_phan_hanh_chinh: string
}
