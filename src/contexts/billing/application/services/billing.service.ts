import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { BillingRepositoryPort } from "../../domain/ports/billing.repository.port";
import { Billing } from "../../domain/entities/billing.entity";
import { CreateBillingDto } from "../dtos/create-billing.dto";
import { UpdateBillingDto } from "../dtos/update-billing.dto";

@Injectable()
export class BillingService {
    constructor(
        @Inject('BillingRepositoryPort')
        private readonly billingRepository: BillingRepositoryPort
    ) { }

    async createBilling(createBillingDto: CreateBillingDto, roleId: string): Promise<Billing> {
        const cistern = new Billing(
            undefined,
            createBillingDto.description,
            roleId,
            new Date(),
            new Date()
        );
        return await this.billingRepository.create(cistern);
    }

    async findAllBilling(roleId: string): Promise<Billing[]> {
        const drivers = await this.billingRepository.findAll(roleId);
        return drivers;
    }

    async updateBilling(id: string, updateBillingDto: UpdateBillingDto): Promise<Billing> {
        const existingCistern = await this.billingRepository.findById(id);
        if (!existingCistern) {
            throw new NotFoundException('La factura no se encuentra registrada');
        }
        return await this.billingRepository.update(id, updateBillingDto);
    }

    async getBillingById(id: string): Promise<Billing> {
        const cistern = await this.billingRepository.findById(id);
        if (!cistern) {
            throw new NotFoundException('La factura no se encuentra registrada');
        }
        return cistern;
    }

    async deleteBilling(id: string): Promise<void> {
        const cistern = await this.billingRepository.findById(id);
        if (!cistern) {
            throw new NotFoundException('La factura no se encuentra registrada');
        }
        await this.billingRepository.delete(id);
    }
}