import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthGuard } from 'src/common/guards/auth.guard';


@ApiTags('Users')
@Controller('properties')
@UseGuards(AuthGuard)
@Controller('users')
export class UserController {

  constructor(
    private readonly userService: UserService,
  ) {}


  @Post()
  @ApiOperation({
    summary: 'Create new user',
    description: 'Create a new admin panel user',
  })
  @ApiResponse({
    status: 201,
    description: 'User created successfully',
  })
  @ApiResponse({
    status: 409,
    description: 'Username already exists',
  })
  create(
    @Body() dto: CreateUserDto,
  ) {
    return this.userService.create(dto);
  }


  @Get()
  @ApiOperation({
    summary: 'Get all users',
  })
  @ApiResponse({
    status: 200,
    description: 'Return all users',
  })
  findAll() {
    return this.userService.findAll();
  }

}