import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { CustomerRepositoryPort } from "../../domain/ports/customer.repository.port";
import { CreateCustomerDto } from "../dtos/create-customer.dto";
import { Customer } from "../../domain/entities/customer.entity";
import { UpdateCustomerDto } from "../dtos/update-customer.dto";

@Injectable()
export class CustomerService {
    constructor(
        @Inject('CustomerRepositoryPort')
        private readonly customerRepository: CustomerRepositoryPort
    ) { }

    async createCustomer(createCustomerDto: CreateCustomerDto, roleId: string): Promise<Customer> {
        const user = new Customer(
            undefined,
            createCustomerDto.name,
            createCustomerDto.code,
            createCustomerDto.document,
            createCustomerDto.business,
            createCustomerDto.ubigeo,
            createCustomerDto.address,
            createCustomerDto.email,
            createCustomerDto.phone,
            roleId,
            new Date(),
            new Date()
        );

        return await this.customerRepository.create(user);
    }

    async findAllCustomer(roleId: string): Promise<Customer[]> {
        const customers = await this.customerRepository.findAll(roleId);
        return customers;
    }

    async updateCustomer(id: string, updateCustomerDto: UpdateCustomerDto): Promise<Customer> {
        const existingCustomer = await this.customerRepository.findById(id);
        if (!existingCustomer) {
            throw new NotFoundException('El cliente no se encuentra registrado');
        }

        return await this.customerRepository.update(id, updateCustomerDto);
    }

    async getCustomerById(id: string): Promise<Customer> {
        const customer = await this.customerRepository.findById(id);
        if (!customer) {
            throw new NotFoundException('El cliente no se encuentra registrado');
        }
        return customer;
    }

    async deleteCustomer(id: string): Promise<void> {
        const customer = await this.customerRepository.findById(id);
        if (!customer) {
            throw new NotFoundException('El cliente no se encuentra registrado');
        }
        await this.customerRepository.delete(id);
    }
}