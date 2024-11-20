import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from "@nestjs/common";
import { CustomerService } from "../../application/services/customer.service";
import { CreateCustomerDto } from "../../application/dtos/create-customer.dto";
import { UpdateCustomerDto } from "../../application/dtos/update-customer.dto";
import { JwtGuard } from "src/contexts/auth/infrastructure/guards/jwt.guard";
import { RolesGuard } from "src/contexts/auth/infrastructure/guards/roles.guard";
import { Roles } from "src/contexts/auth/infrastructure/decorators/roles.decorator";
import { Role } from "src/shared/domain/enums/role.enum";

@Controller('customers')
@UseGuards(JwtGuard, RolesGuard)
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Post()
  @Roles(Role.COMPANY)
  async createCustomer(@Body() createCustomerDto: CreateCustomerDto, @Req() request: any) {
    const { roleId } = request.user;
    return await this.customerService.createCustomer(createCustomerDto, roleId);
  }

  @Get()
  @Roles(Role.COMPANY)
  async findAllCustomer(@Req() request: any) {
    const { roleId } = request.user;
    return await this.customerService.findAllCustomer(roleId);
  }

  @Put(':id')
  @Roles(Role.COMPANY)
  async updateCustomer(
    @Param('id') id: string,
    @Body() updateCustomerDto: UpdateCustomerDto
  ) {
    return await this.customerService.updateCustomer(id, updateCustomerDto);
  }

  @Get(':id')
  @Roles(Role.COMPANY)
  async getCustomer(@Param('id') id: string) {
    return await this.customerService.getCustomerById(id);
  }

  @Delete(':id')
  @Roles(Role.COMPANY)
  async deleteCustomer(@Param('id') id: string) {
    return await this.customerService.deleteCustomer(id);
  }
}