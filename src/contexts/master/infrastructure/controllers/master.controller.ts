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

  @Put(':id/status')
  async updateTaskStatus(
    @Param('id') id: string,
    @Body() updateMasterDto: UpdateMasterDto
  ) {
    return await this.masterService.updateTaskStatus(id, updateMasterDto);
  }

  @Get('user/:userId')
  async getTasksByUserId(@Param('userId') userId: string) {
    return await this.masterService.getTasksByUserId(userId);
  }
}