import { Transform, Type } from 'class-transformer';
import {
  IsArray,
  IsInt,
  IsOptional,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';

export class CreateNganhDto {
  @IsString()
  ten_khoa_hoc: string;
  @IsOptional()
  @IsString()
  ten_tieng_viet?: string;
  @IsOptional()
  @IsString()
  mo_ta?: string;
}

export class UpdateNganhDto {
  @IsOptional()
  @IsString()
  ten_khoa_hoc?: string;
  @IsOptional()
  @IsString()
  ten_tieng_viet?: string;
  @IsOptional()
  @IsString()
  mo_ta?: string;
}

export class CreateManyNganhDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateNganhDto)
  data: CreateNganhDto[];
}

export class SearchNganhDto {
  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  @IsInt()
  @Min(1)
  page: number;

  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  @IsInt()
  @Min(1)
  limit: number;

  @IsOptional()
  @IsString()
  ten_khoa_hoc: string;
}
