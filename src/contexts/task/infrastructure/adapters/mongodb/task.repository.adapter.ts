import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TaskRepositoryPort } from '../../../domain/ports/task.repository.port';
import { Task, TaskStatus } from '../../../domain/entities/task.entity';

@Injectable()
export class TaskRepositoryAdapter implements TaskRepositoryPort {
  constructor(
    @InjectModel('Task') private taskModel: Model<Task>
  ) {}

  async create(task: Task): Promise<Task> {
    const createdTask = new this.taskModel(task);
    return await createdTask.save();
  }

  async findById(id: string): Promise<Task> {
    return await this.taskModel.findById(id).exec();
  }

  async findByUserId(userId: string): Promise<Task[]> {
    return await this.taskModel.find({ userId }).exec();
  }

  async update(id: string, taskData: Partial<Task>): Promise<Task> {
    return await this.taskModel.findByIdAndUpdate(
      id,
      { ...taskData, updatedAt: new Date() },
      { new: true }
    ).exec();
  }

  async delete(id: string): Promise<void> {
    await this.taskModel.findByIdAndDelete(id).exec();
  }
}
