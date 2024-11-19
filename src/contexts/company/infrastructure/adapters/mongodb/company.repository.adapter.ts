import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Company } from 'src/contexts/company/domain/entities/company.entity';
import { CompanyRepositoryPort } from 'src/contexts/company/domain/ports/company.repository.port';

@Injectable()
export class CompanyRepositoryAdapter implements CompanyRepositoryPort {
  constructor(
    @InjectModel('Company') private companyModel: Model<Company>
  ) { }

  async create(company: Company): Promise<Company> {
    const createdCompany = new this.companyModel(company);
    return await createdCompany.save();
  }

  async findById(id: string): Promise<Company> {
    return await this.companyModel.findById(id).exec();
  }

  async findAll(): Promise<Company[]> {
    return await this.companyModel.find().exec();
  }

  async update(id: string, companyData: Partial<Company>): Promise<Company> {
    return await this.companyModel.findByIdAndUpdate(
      id,
      { ...companyData, updatedAt: new Date() },
      { new: true }
    ).exec();
  }

  async delete(id: string): Promise<void> {
    await this.companyModel.findByIdAndDelete(id).exec();
  }
}
