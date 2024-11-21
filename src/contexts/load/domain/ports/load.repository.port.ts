import { Load } from "../entities/load.entity";

export interface LoadRepositoryPort {
    create(load: Load): Promise<Load>;
    findReport(fromDate: Date, toDate: Date, companyId: string): Promise<Load[]>;
  }
  