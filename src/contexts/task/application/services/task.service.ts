import { Inject, Injectable } from '@nestjs/common';
import { TaskRepositoryPort } from '../../domain/ports/task.repository.port';
import { CreateTaskDto } from '../dtos/create-task.dto';
import { UpdateTaskDto } from '../dtos/update-task.dto';
import { Task, TaskStatus } from '../../domain/entities/task.entity';

@Injectable()
export class TaskService {
  constructor(@Inject('TaskRepositoryPort') private readonly taskRepository: TaskRepositoryPort) { }

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const task = new Task(
      undefined,
      createTaskDto.title,
      createTaskDto.description,
      TaskStatus.PENDING,
      createTaskDto.userId,
      new Date(),
      new Date()
    );
    return await this.taskRepository.create(task);
  }

  async updateTaskStatus(id: string, updateTaskDto: UpdateTaskDto): Promise<Task> {
    return await this.taskRepository.update(id, {
      status: updateTaskDto.status
    });
  }

  async getTasksByUserId(userId: string): Promise<Task[]> {
    return await this.taskRepository.findByUserId(userId);
  }
}