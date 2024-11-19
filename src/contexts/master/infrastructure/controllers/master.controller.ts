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
  Req,
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
@Roles(Role.SUPERMASTER)
export class MasterController {
  constructor(private readonly masterService: MasterService) {}

  @Get()
  async findAllMaster(@Req() request: any) {
    const { roleId } = request.user;
    return await this.masterService.findAllMaster();
  }

  @Post()
  @UseInterceptors(FilesInterceptor('image'))
  async createMaster(
    @UploadedFiles() image: any,
    @Body() createMasterDto: CreateMasterDto,
  ) {
    return await this.masterService.createMaster(createMasterDto, image);
  }

  @Put(':id')
  @UseInterceptors(FilesInterceptor('image'))
  async updateMaster(
    @Param('id') id: string,
    @UploadedFiles() image: any,
    @Body() updateMasterDto: UpdateMasterDto,
  ) {
    return await this.masterService.updateMaster(id, updateMasterDto, image);
  }

  @Delete(':id')
  async deleteMaster(@Param('id') id: string) {
    return await this.masterService.deleteMaster(id);
  }
}
