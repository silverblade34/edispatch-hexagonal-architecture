import { Master } from "../entities/master.entity";

export interface MasterRepositoryPort {
    create(task: Master): Promise<Master>;
    findById(id: string): Promise<Master>;
    findByUserId(userId: string): Promise<Master[]>;
    update(id: string, task: Partial<Master>): Promise<Master>;
    delete(id: string): Promise<void>;
  }