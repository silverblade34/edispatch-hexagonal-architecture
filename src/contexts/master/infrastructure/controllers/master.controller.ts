import { Controller, Post, Put, Get, Body, Param } from '@nestjs/common';
import { MasterService } from '../../application/services/master.service';
import { CreateMasterDto } from '../../application/dtos/create-master.dto';
import { UpdateMasterDto } from '../../application/dtos/update-master.dto';

@Controller('masters')
export class MasterController {
  constructor(private readonly masterService: MasterService) {}

  @Post()
  async createMaster(@Body() createMasterDto: CreateMasterDto) {
    return await this.masterService.createTask(createMasterDto);
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