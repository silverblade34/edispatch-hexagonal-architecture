import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from "@nestjs/common";
import { JwtGuard } from "src/contexts/auth/infrastructure/guards/jwt.guard";
import { RolesGuard } from "src/contexts/auth/infrastructure/guards/roles.guard";
import { BillingService } from "../../application/services/billing.service";
import { Roles } from "src/contexts/auth/infrastructure/decorators/roles.decorator";
import { Role } from "src/shared/domain/enums/role.enum";
import { CreateBillingDto } from "../../application/dtos/create-billing.dto";
import { UpdateBillingDto } from "../../application/dtos/update-billing.dto";

@Controller('billings')
@UseGuards(JwtGuard, RolesGuard)
export class BillingController {
    constructor(private readonly billingService: BillingService) { }

    @Post()
    @Roles(Role.COMPANY)
    async createBilling(@Body() createBillingDto: CreateBillingDto, @Req() request: any) {
        const { roleId } = request.user;
        return await this.billingService.createBilling(createBillingDto, roleId);
    }

    @Get()
    @Roles(Role.COMPANY)
    async findAllBilling(@Req() request: any) {
        const { roleId } = request.user;
        return await this.billingService.findAllBilling(roleId);
    }

    @Put(':id')
    @Roles(Role.COMPANY)
    async updateBilling(
        @Param('id') id: string,
        @Body() updateBillingDto: UpdateBillingDto
    ) {
        return await this.billingService.updateBilling(id, updateBillingDto);
    }

    @Get(':id')
    @Roles(Role.COMPANY)
    async getBilling(@Param('id') id: string) {
        return await this.billingService.getBillingById(id);
    }

    @Delete(':id')
    @Roles(Role.COMPANY)
    async deleteBilling(@Param('id') id: string) {
        return await this.billingService.deleteBilling(id);
    }
}