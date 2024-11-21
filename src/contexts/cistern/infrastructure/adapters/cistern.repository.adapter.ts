import { Injectable } from "@nestjs/common";
import { CisternRepositoryPort } from "../../domain/ports/cistern.repository.port";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Cistern } from "../../domain/entities/cistern.entity";

@Injectable()
export class CisternRepositoryAdapter implements CisternRepositoryPort {
  constructor(@InjectModel('Cistern') private cisternModel: Model<Cistern>) {}

  async create(cistern: Cistern): Promise<Cistern> {
    const createdCistern = new this.cisternModel(cistern);
    return await createdCistern.save();
  }

  async findById(id: string): Promise<Cistern> {
    return await this.cisternModel.findById(id).exec();
  }

  async findByUserId(userId: string): Promise<Cistern> {
    return await this.cisternModel.findOne({ userId }).exec();
  }

  async findAll(): Promise<Cistern[]> {
    return await this.cisternModel.find().exec();
  }

  async update(id: string, cisternData: Partial<Cistern>): Promise<Cistern> {
    return await this.cisternModel
      .findByIdAndUpdate(
        id,
        { ...cisternData, updatedAt: new Date() },
        { new: true },
      )
      .exec();
  }

  async delete(id: string): Promise<void> {
    await this.cisternModel.findByIdAndDelete(id).exec();
  }
}
