import { Cistern } from "../entities/cistern.entity";

export interface CisternRepositoryPort {
  create(cistern: Cistern): Promise<Cistern>;
  findById(id: string): Promise<Cistern>;
  findAll(companyId: string): Promise<Cistern[]>;
  update(id: string, cistern: Partial<Cistern>): Promise<Cistern>;
  delete(id: string): Promise<void>;
}
