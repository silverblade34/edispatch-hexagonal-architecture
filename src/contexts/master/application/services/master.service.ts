import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { MasterRepositoryPort } from '../../domain/ports/master.repository.port';
import { CreateMasterDto } from '../dtos/create-master.dto';
import { UpdateMasterDto } from '../dtos/update-master.dto';
import { Master } from '../../domain/entities/master.entity';
import { FileUploadService } from 'src/shared/external/services/file-upload.service';
import { UserService } from 'src/contexts/user/application/services/user.service';
import { CreateUserDto } from 'src/contexts/user/application/dtos/create-user.dto';
import { Role } from 'src/shared/domain/enums/role.enum';
import { UpdateUserDto } from 'src/contexts/user/application/dtos/update-user.dto';
import { ResponseMasterDto } from '../dtos/response-master.dto';

@Injectable()
export class MasterService {
  constructor(
    @Inject('MasterRepositoryPort')
    private readonly masterRepository: MasterRepositoryPort,
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

  private async mapMasterWithUser(master: Master): Promise<ResponseMasterDto> {
    const user = await this.userService.getUserById(master.userId);
    return {
      id: master.id,
      name: master.name,
      identifier: master.identifier,
      logo: master.logo,
      createdAt: master.createdAt,
      updatedAt: master.updatedAt,
      user: {
        id: user.id,
        username: user.username,
        password: user.password,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    };
  }

  async createMaster(
    createMasterDto: CreateMasterDto,
    images: any,
  ): Promise<ResponseMasterDto> {
    const image = images[0];
    this.validateImage(image);

    const createUserDto: CreateUserDto = {
      username: createMasterDto.username,
      password: createMasterDto.password,
      role: Role.MASTER,
    };
    const user = await this.userService.createUser(createUserDto);
    const publicUrl = await this.fileUploadService.uploadLogo(image);
    const master = new Master(
      undefined,
      createMasterDto.name,
      createMasterDto.identifier,
      publicUrl,
      user.id,
      new Date(),
      new Date(),
    );
    const masterCreated = await this.masterRepository.create(master);
    const masterWithUser = this.mapMasterWithUser(masterCreated);
    return masterWithUser;
  }

  async findAllMaster(): Promise<ResponseMasterDto[]> {
    const masters = await this.masterRepository.findAll();
    const mastersWithUser = await Promise.all(
      masters.map((master) => this.mapMasterWithUser(master)),
    );

    return mastersWithUser;
  }

  async updateMaster(
    masterId: string,
    updateMasterDto: UpdateMasterDto,
    images: any,
  ): Promise<ResponseMasterDto> {
    const master = await this.masterRepository.findById(masterId);
    if (!master) {
      throw new NotFoundException(
        `El master con id:${masterId} no se encuentra registrado`,
      );
    }
    let linkImage = master.logo;
    if (images.length > 0) {
      const image = images[0];
      this.validateImage(image);
      linkImage = await this.fileUploadService.uploadLogo(image);
    }

    const updateUserDto: UpdateUserDto = {
      username: updateMasterDto.username,
      password: updateMasterDto.password,
    };
    const userUpdated = await this.userService.updateUser(
      master.userId,
      updateUserDto,
    );
    const masterUpdate = new Master(
      undefined,
      updateMasterDto.name,
      updateMasterDto.identifier,
      linkImage,
      userUpdated.id,
      master.createdAt,
      master.updatedAt,
    );
    const masterUpdated = await this.masterRepository.update(
      masterId,
      masterUpdate,
    );
    const masterWithUser = this.mapMasterWithUser(masterUpdated);
    return masterWithUser;
  }

  async deleteMaster(id: string): Promise<void> {
    const master = await this.masterRepository.findById(id);
    if (!master) {
      throw new NotFoundException('El master no se encuentra registrado');
    }
    await this.userService.deleteUser(master.userId);
    await this.masterRepository.delete(id);
  }
}
