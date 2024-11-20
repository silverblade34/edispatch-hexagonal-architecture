import { Customer } from "../entities/customer.entity";

export interface CustomerRepositoryPort {
  create(customer: Customer): Promise<Customer>;
  findById(id: string): Promise<Customer>;
  findAll(companyId: string): Promise<Customer[]>;
  update(id: string, customer: Partial<Customer>): Promise<Customer>;
  delete(id: string): Promise<void>;
}
