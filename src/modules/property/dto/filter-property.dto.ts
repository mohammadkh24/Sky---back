import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';


export class FilterPropertyDto {

  @ApiPropertyOptional({
    example: 'تهران',
  })
  @IsOptional()
  @IsString()
  city?: string;


  @ApiPropertyOptional({
    example: 'آپارتمان',
  })
  @IsOptional()
  @IsString()
  type?: string;


  @ApiPropertyOptional({
    example: 50000000000,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  maxPrice?: number;


  @ApiPropertyOptional({
    example: 150,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  minArea?: number;

}