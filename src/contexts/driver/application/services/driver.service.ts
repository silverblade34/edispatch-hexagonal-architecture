import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { DriverRepositoryPort } from "../../domain/ports/driver.repository.port";
import { Driver } from "../../domain/entities/driver.entity";
import { CreateDriverDto } from "../dtos/create-driver.dto";
import { UpdateDriverDto } from "../dtos/update-driver.dto";

@Injectable()
export class DriverService {
    constructor(
        @Inject('DriverRepositoryPort')
        private readonly driverRepository: DriverRepositoryPort
    ) { }

    async createDriver(createDriverDto: CreateDriverDto, roleId: string): Promise<Driver> {
        const driver = new Driver(
            undefined,
            createDriverDto.name,
            createDriverDto.lastName,
            createDriverDto.licenseNumber,
            createDriverDto.username,
            createDriverDto.password,
            roleId,
            new Date(),
            new Date()
        );

        return await this.driverRepository.create(driver);
    }

    async findAllDriver(roleId: string): Promise<Driver[]> {
        const drivers = await this.driverRepository.findAll(roleId);
        return drivers;
    }

    async updateDriver(id: string, updateDriverDto: UpdateDriverDto): Promise<Driver> {
        const existingDriver = await this.driverRepository.findById(id);
        if (!existingDriver) {
            throw new NotFoundException('El conductor no se encuentra registrado');
        }

        return await this.driverRepository.update(id, updateDriverDto);
    }

    async getDriverById(id: string): Promise<Driver> {
        const customer = await this.driverRepository.findById(id);
        if (!customer) {
            throw new NotFoundException('El conductor no se encuentra registrado');
        }
        return customer;
    }

    async deleteDriver(id: string): Promise<void> {
        const driver = await this.driverRepository.findById(id);
        if (!driver) {
            throw new NotFoundException('El conductor no se encuentra registrado');
        }
        await this.driverRepository.delete(id);
    }
}