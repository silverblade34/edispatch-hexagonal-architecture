import { Controller, Post, Put, Get, Body, Param, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { MasterService } from '../../application/services/master.service';
import { CreateMasterDto } from '../../application/dtos/create-master.dto';
import { UpdateMasterDto } from '../../application/dtos/update-master.dto';
import { FilesInterceptor } from '@nestjs/platform-express';

@Controller('masters')
export class MasterController {
  constructor(private readonly masterService: MasterService) { }

  @Post()
  @UseInterceptors(FilesInterceptor('image'))
  async createMaster(@UploadedFiles() image: any, @Body() createMasterDto: CreateMasterDto) {
    return await this.masterService.createMaster(createMasterDto, image);
  }

  @Put()
  @UseInterceptors(FilesInterceptor('image'))
  async updateMaster(@UploadedFiles() image: any, @Body() updateMasterDto: UpdateMasterDto) {
    return await this.masterService.updateMaster(updateMasterDto, image);
  }
}