import { Master } from "../entities/master.entity";

export interface MasterRepositoryPort {
  create(master: Master): Promise<Master>;
  findById(id: string): Promise<Master>;
  findByUserId(userId: string): Promise<Master[]>;
  update(id: string, master: Partial<Master>): Promise<Master>;
  delete(id: string): Promise<void>;
}