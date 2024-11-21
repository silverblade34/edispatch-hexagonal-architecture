import { Zone } from "../entities/zone.entity";

export interface ZoneRepositoryPort {
  create(zone: Zone): Promise<Zone>;
  findById(id: string): Promise<Zone>;
  findAll(companyId: string): Promise<Zone[]>;
  update(id: string, zone: Partial<Zone>): Promise<Zone>;
  delete(id: string): Promise<void>;
}
