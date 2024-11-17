import { Injectable } from '@nestjs/common';
import { JwtService as NestJwtService } from '@nestjs/jwt';
import { JwtServicePort } from '../../domain/ports/jwt.service.port';
import { JwtPayloadDto } from '../../application/dtos/jwt-payload.dto';

@Injectable()
export class JwtAdapter implements JwtServicePort {
  constructor(private readonly jwtService: NestJwtService) {}

  async sign(payload: JwtPayloadDto): Promise<string> {
    return this.jwtService.sign(payload);
  }

  async verify(token: string): Promise<JwtPayloadDto> {
    return this.jwtService.verify(token);
  }
}
