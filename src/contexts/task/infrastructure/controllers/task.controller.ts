import { Controller, Post, Put, Get, Body, Param } from '@nestjs/common';
import { TaskService } from '../../application/services/task.service';
import { CreateTaskDto } from '../../application/dtos/create-task.dto';
import { UpdateTaskDto } from '../../application/dtos/update-task.dto';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  async createTask(@Body() createTaskDto: CreateTaskDto) {
    return await this.taskService.createTask(createTaskDto);
  }

  @Put(':id/status')
  async updateTaskStatus(
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto
  ) {
    return await this.taskService.updateTaskStatus(id, updateTaskDto);
  }

  @Get('user/:userId')
  async getTasksByUserId(@Param('userId') userId: string) {
    return await this.taskService.getTasksByUserId(userId);
  }
}