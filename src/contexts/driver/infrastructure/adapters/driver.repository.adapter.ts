import { Injectable } from "@nestjs/common";
import { DriverRepositoryPort } from "../../domain/ports/driver.repository.port";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Driver } from "../../domain/entities/driver.entity";

@Injectable()
export class DriverRepositoryAdapter implements DriverRepositoryPort {
  constructor(@InjectModel('Driver') private driverModel: Model<Driver>) {}

  async create(driver: Driver): Promise<Driver> {
    const createdDriver = new this.driverModel(driver);
    return await createdDriver.save();
  }

  async findById(id: string): Promise<Driver> {
    return await this.driverModel.findById(id).exec();
  }

  async findByUserId(userId: string): Promise<Driver> {
    return await this.driverModel.findOne({ userId }).exec();
  }

  async findAll(): Promise<Driver[]> {
    return await this.driverModel.find().exec();
  }

  async update(id: string, driverData: Partial<Driver>): Promise<Driver> {
    return await this.driverModel
      .findByIdAndUpdate(
        id,
        { ...driverData, updatedAt: new Date() },
        { new: true },
      )
      .exec();
  }

  async delete(id: string): Promise<void> {
    await this.driverModel.findByIdAndDelete(id).exec();
  }
}
