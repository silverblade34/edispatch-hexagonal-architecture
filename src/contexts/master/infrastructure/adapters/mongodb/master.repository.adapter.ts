import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MasterRepositoryPort } from '../../../domain/ports/master.repository.port';
import { Master } from '../../../domain/entities/master.entity';

@Injectable()
export class MasterRepositoryAdapter implements MasterRepositoryPort {
  constructor(
    @InjectModel('Master') private masterModel: Model<Master>
  ) {}

  async create(task: Master): Promise<Master> {
    const createdTask = new this.masterModel(task);
    return await createdTask.save();
  }

  async findById(id: string): Promise<Master> {
    return await this.masterModel.findById(id).exec();
  }

  async findByUserId(userId: string): Promise<Master[]> {
    return await this.masterModel.find({ userId }).exec();
  }

  async update(id: string, masterData: Partial<Master>): Promise<Master> {
    return await this.masterModel.findByIdAndUpdate(
      id,
      { ...masterData, updatedAt: new Date() },
      { new: true }
    ).exec();
  }

  async delete(id: string): Promise<void> {
    await this.masterModel.findByIdAndDelete(id).exec();
  }
}
