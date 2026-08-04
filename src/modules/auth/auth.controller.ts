import {
  Body,
  Controller,
  Post,
} from '@nestjs/common';

import {
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';


@ApiTags('Auth')
@Controller('auth')
export class AuthController {

  constructor(
    private authService: AuthService,
  ) {}


  @Post('login')
  @ApiOperation({
    summary: 'User login',
  })
  @ApiResponse({
    status: 200,
    description: 'Return JWT token',
  })
  @ApiResponse({
    status: 401,
    description: 'Invalid username or password',
  })
  login(
    @Body() dto: LoginDto,
  ) {
    return this.authService.login(dto);
  }

}