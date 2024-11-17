import { JwtPayloadDto } from '../../application/dtos/jwt-payload.dto';

export interface JwtServicePort {
  sign(payload: JwtPayloadDto): Promise<string>;
  verify(token: string): Promise<JwtPayloadDto>;
}