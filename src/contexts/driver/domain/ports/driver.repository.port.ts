import { Driver } from "../entities/driver.entity";

export interface DriverRepositoryPort {
  create(driver: Driver): Promise<Driver>;
  findById(id: string): Promise<Driver>;
  findAll(companyId: string): Promise<Driver[]>;
  update(id: string, customer: Partial<Driver>): Promise<Driver>;
  delete(id: string): Promise<void>;
}
