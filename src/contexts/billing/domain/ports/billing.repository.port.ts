import { Billing } from "../entities/billing.entity";

export interface BillingRepositoryPort {
  create(billing: Billing): Promise<Billing>;
  findById(id: string): Promise<Billing>;
  findAll(companyId: string): Promise<Billing[]>;
  update(id: string, billing: Partial<Billing>): Promise<Billing>;
  delete(id: string): Promise<void>;
}
