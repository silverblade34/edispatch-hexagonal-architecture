import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MasterRepositoryPort } from '../../../domain/ports/master.repository.port';
import { Master } from '../../../domain/entities/master.entity';

@Injectable()
export class MasterRepositoryAdapter implements MasterRepositoryPort {
  constructor(@InjectModel('Master') private masterModel: Model<Master>) {}

  async create(master: Master): Promise<Master> {
    const createdMaster = new this.masterModel(master);
    return await createdMaster.save();
  }

  async findById(id: string): Promise<Master> {
    return await this.masterModel.findById(id).exec();
  }

  async findByUserId(userId: string): Promise<Master> {
    return await this.masterModel.findOne({ userId }).exec();
  }

  async findAll(): Promise<Master[]> {
    return await this.masterModel.find().exec();
  }

  async update(id: string, masterData: Partial<Master>): Promise<Master> {
    return await this.masterModel
      .findByIdAndUpdate(
        id,
        { ...masterData, updatedAt: new Date() },
        { new: true },
      )
      .exec();
  }

  async delete(id: string): Promise<void> {
    await this.masterModel.findByIdAndDelete(id).exec();
  }
}
