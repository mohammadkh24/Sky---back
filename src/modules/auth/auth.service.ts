import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { UserService } from '../user/user.service';
import { authMessages, userMessages } from 'src/common/enums/messages.enum';
import { access } from 'fs';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(dto: LoginDto) {
    const { username, password } = dto;

    const user = await this.userService.findByUsernameWithPassword(username);

    if (!user) throw new UnauthorizedException(authMessages.INVALID_INPUT);

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) throw new UnauthorizedException(authMessages.INVALID_INPUT);

    const payload = {
      sub: user.id,
      username: user.username,
    };

    return {
      message: authMessages.LOGIN_SUCCESS,
      data: {
        accessToken: this.jwtService.sign(payload),
      },
    };
  }
  
}
