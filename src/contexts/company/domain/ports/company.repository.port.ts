import { Company } from '../entities/company.entity';

export interface CompanyRepositoryPort {
  create(company: Company): Promise<Company>;
  findById(id: string): Promise<Company>;
  findByUserId(userId: string): Promise<Company>;
  findAllByMaster(masterId: string): Promise<Company[]>;
  update(id: string, company: Partial<Company>): Promise<Company>;
  delete(id: string): Promise<void>;
}
