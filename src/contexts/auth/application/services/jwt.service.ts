import { Injectable } from '@nestjs/common';
import { JwtService as NestJwtService } from '@nestjs/jwt';
import { JwtPayloadDto } from '../dtos/jwt-payload.dto';
import { JwtServicePort } from '../../domain/ports/jwt.service.port';

@Injectable()
export class JwtService implements JwtServicePort {
  constructor(private jwtService: NestJwtService) {}

  async sign(payload: JwtPayloadDto): Promise<string> {
    return this.jwtService.sign(payload);
  }

  async verify(token: string): Promise<JwtPayloadDto> {
    return this.jwtService.verify(token);
  }
}
