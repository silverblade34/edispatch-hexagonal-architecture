import { Controller, Post, Put, Get, Body, Param, UseInterceptors, UploadedFiles, Delete } from '@nestjs/common';
import { MasterService } from '../../application/services/master.service';
import { CreateMasterDto } from '../../application/dtos/create-master.dto';
import { UpdateMasterDto } from '../../application/dtos/update-master.dto';
import { FilesInterceptor } from '@nestjs/platform-express';

@Controller('masters')
export class MasterController {
  constructor(private readonly masterService: MasterService) { }

  @Get()
  async findAllMaster() {
    return await this.masterService.findAllMaster();
  }

  @Post()
  @UseInterceptors(FilesInterceptor('image'))
  async createMaster(@UploadedFiles() image: any, @Body() createMasterDto: CreateMasterDto) {
    return await this.masterService.createMaster(createMasterDto, image);
  }

  @Put(":id")
  @UseInterceptors(FilesInterceptor('image'))
  async updateMaster(@Param('id') id: string, @UploadedFiles() image: any, @Body() updateMasterDto: UpdateMasterDto) {
    return await this.masterService.updateMaster(id, updateMasterDto, image);
  }

  @Delete(":id")
  async deleteMaster(@Param('id') id: string) {
    return await this.masterService.deleteMaster(id);
  }
}