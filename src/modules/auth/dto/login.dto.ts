import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class LoginDto {

  @ApiProperty({
    example: 'admin',
  })
  @IsString()
  username: string;


  @ApiProperty({
    example: '12345678',
  })
  @IsString()
  password: string;

}