import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthRepositoryPort } from "../../domain/ports/auth.repository.port";
import { JwtServicePort } from "../../domain/ports/jwt.service.port";

@Injectable()
export class AuthService {
  constructor(
    @Inject('AuthRepositoryPort')
    private authRepository: AuthRepositoryPort,
    @Inject('JwtServicePort')
    private jwtService: JwtServicePort
  ) { }

  async login(username: string, password: string): Promise<string> {
    const isValidUser = await this.authRepository.findByUsername(username);
    if (!isValidUser) {
      throw new UnauthorizedException('El usuario no se encuentra registrado');
    }

    const validCredential = await this.authRepository.validateCredentials(isValidUser.password, password);
    if (!validCredential) {
      throw new UnauthorizedException('La contraseña es incorrecta');
    }
    const payload = {
      sub: isValidUser.id,
      username: isValidUser.username,
      role: isValidUser.role
    };

    return this.jwtService.sign(payload);
  }
}