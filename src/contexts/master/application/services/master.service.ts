import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { MasterRepositoryPort } from '../../domain/ports/master.repository.port';
import { CreateMasterDto } from '../dtos/create-master.dto';
import { UpdateMasterDto } from '../dtos/update-master.dto';
import { Master } from '../../domain/entities/master.entity';
import { FileUploadService } from 'src/shared/external/services/file-upload.service';
import { UserService } from 'src/contexts/user/application/services/user.service';
import { CreateUserDto } from 'src/contexts/user/application/dtos/create-user.dto';
import { Role } from 'src/shared/domain/enums/role.enum';

@Injectable()
export class MasterService {
  constructor(
    @Inject('MasterRepositoryPort') private readonly masterRepository: MasterRepositoryPort,
    private readonly fileUploadService: FileUploadService,
    private readonly userService: UserService
  ) { }

  async createMaster(createMasterDto: CreateMasterDto, images: any): Promise<Master> {
    const image = images[0]
    if (!image) {
      throw new NotFoundException('Debe cargar una imagen de logo');
    }
    const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    if (!allowedMimeTypes.includes(image.mimetype)) {
      throw new BadRequestException('El archivo debe ser una imagen (jpeg, png, jpg)');
    }
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
      new Date()
    );
    return await this.masterRepository.create(master);
  }

  async updateMaster(updateMasterDto: UpdateMasterDto, images: any): Promise<Master> {
    console.log(images)
    const image = images[0]
    if (!image) {
      throw new NotFoundException('Debe cargar una imagen de logo');
    }
    const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    if (!allowedMimeTypes.includes(image.mimetype)) {
      throw new BadRequestException('El archivo debe ser una imagen (jpeg, png, jpg)');
    }
    // const createUserDto: CreateUserDto = {
    //   username: updateMasterDto.username,
    //   password: updateMasterDto.password,
    //   role: Role.MASTER,
    // };
    // const user = await this.userService.createUser(createUserDto);
    // const publicUrl = await this.fileUploadService.uploadLogo(image);
    // const master = new Master(
    //   undefined,ß
    //   updateMasterDto.name,
    //   updateMasterDto.identifier,
    //   publicUrl,
    //   user.id,
    //   new Date(),
    //   new Date()
    // );
    // return await this.masterRepository.create(master);
    return null;
  }
}