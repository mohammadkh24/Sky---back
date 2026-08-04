import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateUserDto {

  @ApiProperty({
    example: 'admin',
    description: 'Username of the user',
  })
  @IsString()
  username: string;


  @ApiProperty({
    example: '12345678',
    description: 'Password of the user',
  })
  @IsString()
  password: string;

}