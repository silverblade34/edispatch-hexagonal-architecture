import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtServicePort } from '../../domain/ports/jwt.service.port';

@Injectable()
export class JwtGuard extends AuthGuard('jwt') {
  constructor(private readonly jwtService: JwtServicePort) {
    super();
  }

  handleRequest(err: any, user: any, info: any) {
    if (err || !user) {
      throw err || new UnauthorizedException('Token inválido o expirado');
    }
    return user;
  }
}
