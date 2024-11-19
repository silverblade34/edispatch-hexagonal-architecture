import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { FileUploadService } from 'src/shared/external/services/file-upload.service';
import { UserService } from 'src/contexts/user/application/services/user.service';
import { CreateUserDto } from 'src/contexts/user/application/dtos/create-user.dto';
import { Role } from 'src/shared/domain/enums/role.enum';
import { UpdateUserDto } from 'src/contexts/user/application/dtos/update-user.dto';
import { CompanyRepositoryPort } from '../../domain/ports/company.repository.port';
import { ResponseCompanyDto } from '../dtos/response-company.dto';
import { Company } from '../../domain/entities/company.entity';
import { CreateCompanyDto } from '../dtos/create-company.dto';
import { UpdateCompanyDto } from '../dtos/update-company.dto';

@Injectable()
export class CompanyService {
  constructor(
    @Inject('CompanyRepositoryPort')
    private readonly companyRepository: CompanyRepositoryPort,
    private readonly fileUploadService: FileUploadService,
    private readonly userService: UserService,
  ) {}

  private validateImage(image: any): void {
    const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    if (!image) {
      throw new NotFoundException('Debe cargar una imagen de logo');
    }
    if (!allowedMimeTypes.includes(image.mimetype)) {
      throw new BadRequestException(
        'El archivo debe ser una imagen (jpeg, png, jpg)',
      );
    }
  }

  private async mapCompanyWithUser(
    company: Company,
  ): Promise<ResponseCompanyDto> {
    const user = await this.userService.getUserById(company.userId);
    return {
      id: company.id,
      name: company.name,
      identifier: company.identifier,
      logo: company.logo,
      createdAt: company.createdAt,
      updatedAt: company.updatedAt,
      user: {
        id: user.id,
        username: user.username,
        password: user.password,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    };
  }

  async createCompany(
    createCompanyDto: CreateCompanyDto,
    images: any,
    roleId: string,
  ): Promise<ResponseCompanyDto> {
    const image = images[0];
    this.validateImage(image);

    const createUserDto: CreateUserDto = {
      username: createCompanyDto.username,
      password: createCompanyDto.password,
      role: Role.COMPANY,
    };
    const user = await this.userService.createUser(createUserDto);
    const publicUrl = await this.fileUploadService.uploadLogo(image);
    const company = new Company(
      undefined,
      createCompanyDto.name,
      createCompanyDto.identifier,
      publicUrl,
      user.id,
      roleId,
      new Date(),
      new Date(),
    );
    const companyCreated = await this.companyRepository.create(company);
    const companyWithUser = this.mapCompanyWithUser(companyCreated);
    return companyWithUser;
  }

  async findAllCompany(roleId: string): Promise<ResponseCompanyDto[]> {
    const companies = await this.companyRepository.findAllByMaster(roleId);
    const companiesWithUser = await Promise.all(
      companies.map((company) => this.mapCompanyWithUser(company)),
    );
    return companiesWithUser;
  }

  async updateCompany(
    companyId: string,
    updateCompanyDto: UpdateCompanyDto,
    images: any,
  ): Promise<ResponseCompanyDto> {
    const company = await this.companyRepository.findById(companyId);
    if (!company) {
      throw new NotFoundException(
        `La compañia con id:${companyId} no se encuentra registrado`,
      );
    }
    let linkImage = company.logo;
    if (images.length > 0) {
      const image = images[0];
      this.validateImage(image);
      linkImage = await this.fileUploadService.uploadLogo(image);
    }

    const updateUserDto: UpdateUserDto = {
      username: updateCompanyDto.username,
      password: updateCompanyDto.password,
    };
    const userUpdated = await this.userService.updateUser(
      company.userId,
      updateUserDto,
    );
    const companyUpdate = new Company(
      undefined,
      updateCompanyDto.name,
      updateCompanyDto.identifier,
      linkImage,
      userUpdated.id,
      company.masterId,
      company.createdAt,
      company.updatedAt,
    );
    const companyUpdated = await this.companyRepository.update(
      companyId,
      companyUpdate,
    );
    const companyWithUser = this.mapCompanyWithUser(companyUpdated);
    return companyWithUser;
  }

  async deleteCompany(id: string): Promise<void> {
    const company = await this.companyRepository.findById(id);
    if (!company) {
      throw new NotFoundException('La compañia no se encuentra registrado');
    }
    await this.userService.deleteUser(company.userId);
    await this.companyRepository.delete(id);
  }
}
