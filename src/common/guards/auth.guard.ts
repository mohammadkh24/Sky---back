import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { ConfigService } from '@nestjs/config';
import * as jwt from 'jsonwebtoken';

interface JwtPayloadWithUsername {
  sub: number;
  username: string;
  iat?: number;
  exp?: number;
}

@Injectable()
export class AuthGuard implements CanActivate {
  private readonly jwtSecret: string;

  constructor(private readonly configService: ConfigService) {
    this.jwtSecret = this.configService.get<string>('jwt.accessTokenSecret')!;
  }

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request & { user?: JwtPayloadWithUsername }>();
    const token = this.extractToken(request);

    if (!token) {
      throw new UnauthorizedException('توکن خالی یا نامعتبر است');
    }

    try {
      const decoded = jwt.verify(token, this.jwtSecret);

      // تبدیل اولیه به unknown
      const payloadUnknown = decoded as unknown;

      // بررسی که حتما object است
      if (typeof payloadUnknown !== 'object' || payloadUnknown === null) {
        throw new UnauthorizedException('توکن نامعتبر است');
      }

      // بررسی فیلدهای مورد نیاز
      if (!('sub' in payloadUnknown) || !('username' in payloadUnknown)) {
        throw new UnauthorizedException('توکن ناقص است');
      }

      // safe cast به type خودمون
      const payload = payloadUnknown as JwtPayloadWithUsername;

      request.user = payload;
      return true;
    } catch (err) {
      throw new UnauthorizedException('توکن نامعتبر یا منقضی شده');
    }
  }

  private extractToken(request: Request): string | null {
    const authHeader = request.headers['authorization'];
    if (!authHeader) return null;

    const [bearer, token] = authHeader.split(' ');
    if (bearer?.toLowerCase() !== 'bearer' || !token) return null;

    return token;
  }
}
