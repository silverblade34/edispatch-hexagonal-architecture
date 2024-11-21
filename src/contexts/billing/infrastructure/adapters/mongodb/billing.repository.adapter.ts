import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Billing } from "src/contexts/billing/domain/entities/billing.entity";
import { BillingRepositoryPort } from "src/contexts/billing/domain/ports/billing.repository.port";

@Injectable()
export class BillingRepositoryAdapter implements BillingRepositoryPort {
  constructor(@InjectModel('Billing') private billingModel: Model<Billing>) {}

  async create(billing: Billing): Promise<Billing> {
    const createdBilling = new this.billingModel(billing);
    return await createdBilling.save();
  }

  async findById(id: string): Promise<Billing> {
    return await this.billingModel.findById(id).exec();
  }

  async findAll(): Promise<Billing[]> {
    return await this.billingModel.find().exec();
  }

  async update(id: string, billingData: Partial<Billing>): Promise<Billing> {
    return await this.billingModel
      .findByIdAndUpdate(
        id,
        { ...billingData, updatedAt: new Date() },
        { new: true },
      )
      .exec();
  }

  async delete(id: string): Promise<void> {
    await this.billingModel.findByIdAndDelete(id).exec();
  }
}
