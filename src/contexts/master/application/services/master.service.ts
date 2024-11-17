import { Inject, Injectable } from '@nestjs/common';
import { MasterRepositoryPort } from '../../domain/ports/master.repository.port';
import { CreateMasterDto } from '../dtos/create-master.dto';
import { UpdateMasterDto } from '../dtos/update-master.dto';
import { Master, MasterStatus } from '../../domain/entities/master.entity';

@Injectable()
export class MasterService {
  constructor(@Inject('MasterRepositoryPort') private readonly masterRepository: MasterRepositoryPort) { }

  async createTask(createTaskDto: CreateMasterDto): Promise<Master> {
    const task = new Master(
      undefined,
      createTaskDto.title,
      createTaskDto.description,
      MasterStatus.PENDING,
      createTaskDto.userId,
      new Date(),
      new Date()
    );
    return await this.masterRepository.create(task);
  }

  async updateTaskStatus(id: string, updateMasterDto: UpdateMasterDto): Promise<Master> {
    return await this.masterRepository.update(id, {
      status: updateMasterDto.status
    });
  }

  async getTasksByUserId(userId: string): Promise<Master[]> {
    return await this.masterRepository.findByUserId(userId);
  }
}