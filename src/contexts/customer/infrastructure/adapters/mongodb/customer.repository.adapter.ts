import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Customer } from 'src/contexts/customer/domain/entities/customer.entity';
import { CustomerRepositoryPort } from 'src/contexts/customer/domain/ports/customer.repository.port';

@Injectable()
export class CustomerRepositoryAdapter implements CustomerRepositoryPort {
  constructor(@InjectModel('Customer') private customerModel: Model<Customer>) { }

  async create(customer: Customer): Promise<Customer> {
    const createdCustomer = new this.customerModel(customer);
    return await createdCustomer.save();
  }

  async findById(id: string): Promise<Customer> {
    return await this.customerModel.findById(id).exec();
  }

  async findByUserId(userId: string): Promise<Customer> {
    return await this.customerModel.findOne({ userId }).exec();
  }

  async findAll(companyId: string): Promise<Customer[]> {
    return await this.customerModel.find({ companyId }).exec();
  }

  async update(id: string, customerData: Partial<Customer>): Promise<Customer> {
    return await this.customerModel
      .findByIdAndUpdate(
        id,
        { ...customerData, updatedAt: new Date() },
        { new: true },
      )
      .exec();
  }

  async delete(id: string): Promise<void> {
    await this.customerModel.findByIdAndDelete(id).exec();
  }
}
