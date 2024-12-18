import {
  Controller,
  Post,
  Put,
  Get,
  Body,
  Param,
  UseInterceptors,
  UploadedFiles,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { MasterService } from '../../application/services/master.service';
import { CreateMasterDto } from '../../application/dtos/create-master.dto';
import { UpdateMasterDto } from '../../application/dtos/update-master.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { Roles } from 'src/contexts/auth/infrastructure/decorators/roles.decorator';
import { Role } from 'src/shared/domain/enums/role.enum';
import { RolesGuard } from 'src/contexts/auth/infrastructure/guards/roles.guard';
import { JwtGuard } from 'src/contexts/auth/infrastructure/guards/jwt.guard';

@Controller('masters')
@UseGuards(JwtGuard, RolesGuard)
export class MasterController {
  constructor(private readonly masterService: MasterService) {}

  @Get()
  @Roles(Role.SUPERMASTER)
  async findAllMaster() {
    return await this.masterService.findAllMaster();
  }

  @Post()
  @Roles(Role.SUPERMASTER)
  @UseInterceptors(FilesInterceptor('image'))
  async createMaster(
    @UploadedFiles() image: any,
    @Body() createMasterDto: CreateMasterDto,
  ) {
    return await this.masterService.createMaster(createMasterDto, image);
  }

  @Put(':id')
  @Roles(Role.SUPERMASTER)
  @UseInterceptors(FilesInterceptor('image'))
  async updateMaster(
    @Param('id') id: string,
    @UploadedFiles() image: any,
    @Body() updateMasterDto: UpdateMasterDto,
  ) {
    return await this.masterService.updateMaster(id, updateMasterDto, image);
  }

  @Delete(':id')
  @Roles(Role.SUPERMASTER)
  async deleteMaster(@Param('id') id: string) {
    return await this.masterService.deleteMaster(id);
  }
}
