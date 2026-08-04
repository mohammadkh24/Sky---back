import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';

export class CreatePropertyDto {

  @ApiProperty({
    example: true,
  })
  @Transform(({ value }) => value === 'true')
  @IsBoolean()
  isVip: boolean;


  @ApiProperty({
    example: 'پنت‌هاوس نمای برج میلاد',
  })
  @IsString()
  title: string;


  @ApiProperty({
    example: 42000000000,
  })
  @Type(() => Number)
  @IsNumber()
  price: number;


  @ApiProperty({
    example: 'زعفرانیه، تهران',
  })
  @IsString()
  location: string;


  @ApiProperty({
    example: 280,
  })
  @Type(() => Number)
  @IsInt()
  area: number;


  @ApiProperty({
    example: 3,
  })
  @Type(() => Number)
  @IsInt()
  bedrooms: number;


  @ApiProperty({
    example: 'پنت‌هاوس لوکس',
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;


  @Transform(({ value }) => {
    if (!value) return [];
  
    if (Array.isArray(value)) {
      return value;
    }
  
    return value.split(',');
  })
  @ApiProperty({
    example: 'پارکینگ,آسانسور',
    required: false,
  })
  @IsOptional()
  @IsArray()
  facilities?: string[];


  @ApiProperty({
    example: 'آپارتمان',
  })
  @IsString()
  type: string;
}