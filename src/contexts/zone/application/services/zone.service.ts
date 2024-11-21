import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { ZoneRepositoryPort } from "../../domain/ports/zone.repository.port";
import { CreateZoneDto } from "../dtos/create-zone.dto";
import { Zone } from "../../domain/entities/zone.entity";
import { UpdateZoneDto } from "../dtos/update-zone.dto";

@Injectable()
export class BillingService {
    constructor(
        @Inject('ZoneRepositoryPort')
        private readonly zoneRepository: ZoneRepositoryPort
    ) { }

    async createBilling(createZoneDto: CreateZoneDto, roleId: string): Promise<Zone> {
        const cistern = new Zone(
            undefined,
            createZoneDto.name,
            createZoneDto.code,
            createZoneDto.description,
            createZoneDto.zipcode,
            roleId,
            new Date(),
            new Date()
        );
        return await this.zoneRepository.create(cistern);
    }

    async findAllBilling(roleId: string): Promise<Zone[]> {
        const drivers = await this.zoneRepository.findAll(roleId);
        return drivers;
    }

    async updateBilling(id: string, updateZoneDto: UpdateZoneDto): Promise<Zone> {
        const existingCistern = await this.zoneRepository.findById(id);
        if (!existingCistern) {
            throw new NotFoundException('La factura no se encuentra registrada');
        }
        return await this.zoneRepository.update(id, updateZoneDto);
    }

    async getBillingById(id: string): Promise<Zone> {
        const cistern = await this.zoneRepository.findById(id);
        if (!cistern) {
            throw new NotFoundException('La factura no se encuentra registrada');
        }
        return cistern;
    }

    async deleteBilling(id: string): Promise<void> {
        const cistern = await this.zoneRepository.findById(id);
        if (!cistern) {
            throw new NotFoundException('La factura no se encuentra registrada');
        }
        await this.zoneRepository.delete(id);
    }
}