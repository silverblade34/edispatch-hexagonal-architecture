import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthRepositoryPort } from '../../domain/ports/auth.repository.port';
import { JwtServicePort } from '../../domain/ports/jwt.service.port';
import { MasterRepositoryPort } from 'src/contexts/master/domain/ports/master.repository.port';
import { CompanyRepositoryPort } from 'src/contexts/company/domain/ports/company.repository.port';

@Injectable()
export class AuthService {
  constructor(
    @Inject('AuthRepositoryPort')
    private authRepository: AuthRepositoryPort,
    @Inject('MasterRepositoryPort')
    private readonly masterRepository: MasterRepositoryPort,
    @Inject('CompanyRepositoryPort')
    private readonly companyRepository: CompanyRepositoryPort,
    @Inject('JwtServicePort')
    private jwtService: JwtServicePort,
  ) {}

  async login(username: string, password: string): Promise<string> {
    const isValidUser = await this.authRepository.findByUsername(username);
    if (!isValidUser) {
      throw new UnauthorizedException('El usuario no se encuentra registrado');
    }

    const validCredential = await this.authRepository.validateCredentials(
      isValidUser.password,
      password,
    );
    if (!validCredential) {
      throw new UnauthorizedException('La contraseña es incorrecta');
    }

    let roleId = '';
    if (isValidUser.role == 'MASTER') {
      const master = await this.masterRepository.findByUserId(isValidUser.id);
      roleId = master.id;
    } else if (isValidUser.role == 'COMPANY') {
      const company = await this.companyRepository.findByUserId(isValidUser.id);
      roleId = company.id;
    }
    const payload = {
      sub: isValidUser.id,
      username: isValidUser.username,
      role: isValidUser.role,
      roleId: roleId,
    };

    return this.jwtService.sign(payload);
  }
}
