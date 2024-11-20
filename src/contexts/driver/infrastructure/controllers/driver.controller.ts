import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from "@nestjs/common";
import { Roles } from "src/contexts/auth/infrastructure/decorators/roles.decorator";
import { JwtGuard } from "src/contexts/auth/infrastructure/guards/jwt.guard";
import { RolesGuard } from "src/contexts/auth/infrastructure/guards/roles.guard";
import { Role } from "src/shared/domain/enums/role.enum";
import { CreateDriverDto } from "../../application/dtos/create-driver.dto";
import { DriverService } from "../../application/services/driver.service";
import { UpdateDriverDto } from "../../application/dtos/update-driver.dto";

@Controller('drivers')
@UseGuards(JwtGuard, RolesGuard)
export class DriverController {
    constructor(private readonly driverService: DriverService) { }

    @Post()
    @Roles(Role.COMPANY)
    async createDriver(@Body() createDriverDto: CreateDriverDto, @Req() request: any) {
        const { roleId } = request.user;
        return await this.driverService.createDriver(createDriverDto, roleId);
    }

    @Get()
    @Roles(Role.COMPANY)
    async findAllCustomer(@Req() request: any) {
        const { roleId } = request.user;
        return await this.driverService.findAllDrivers(roleId);
    }

    @Put(':id')
    @Roles(Role.COMPANY)
    async updateDriver(
        @Param('id') id: string,
        @Body() updateDriverDto: UpdateDriverDto
    ) {
        return await this.driverService.updateDriver(id, updateDriverDto);
    }

    @Get(':id')
    @Roles(Role.COMPANY)
    async getDriver(@Param('id') id: string) {
        return await this.driverService.getDriverById(id);
    }

    @Delete(':id')
    @Roles(Role.COMPANY)
    async deleteDriver(@Param('id') id: string) {
        return await this.driverService.deleteDriver(id);
    }
}