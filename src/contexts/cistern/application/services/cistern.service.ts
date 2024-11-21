import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { CisternRepositoryPort } from "../../domain/ports/cistern.repository.port";
import { Cistern } from "../../domain/entities/cistern.entity";
import { CreateCisternDto } from "../dtos/create-cistern.dto";
import { UpdateCisternDto } from "../dtos/update-cistern.dto";

@Injectable()
export class CisternService {
    constructor(
        @Inject('CisternRepositoryPort')
        private readonly cisternRepository: CisternRepositoryPort
    ) { }

    async createCistern(createCisternDto: CreateCisternDto, roleId: string): Promise<Cistern> {
        const cistern = new Cistern(
            undefined,
            createCisternDto.code,
            createCisternDto.capacity,
            createCisternDto.plate,
            createCisternDto.documentSeries,
            roleId,
            new Date(),
            new Date()
        );
        return await this.cisternRepository.create(cistern);
    }

    async findAllCistern(roleId: string): Promise<Cistern[]> {
        const cisterns = await this.cisternRepository.findAll(roleId);
        return cisterns;
    }

    async updateCistern(id: string, updateCisternDto: UpdateCisternDto): Promise<Cistern> {
        const existingCistern = await this.cisternRepository.findById(id);
        if (!existingCistern) {
            throw new NotFoundException('La cisterna no se encuentra registrado');
        }
        return await this.cisternRepository.update(id, updateCisternDto);
    }

    async getCisternById(id: string): Promise<Cistern> {
        const cistern = await this.cisternRepository.findById(id);
        if (!cistern) {
            throw new NotFoundException('La cisterna no se encuentra registrado');
        }
        return cistern;
    }

    async deleteCistern(id: string): Promise<void> {
        const cistern = await this.cisternRepository.findById(id);
        if (!cistern) {
            throw new NotFoundException('La cisterna no se encuentra registrado');
        }
        await this.cisternRepository.delete(id);
    }
}