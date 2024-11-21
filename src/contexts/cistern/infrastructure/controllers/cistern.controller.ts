import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from "@nestjs/common";
import { JwtGuard } from "src/contexts/auth/infrastructure/guards/jwt.guard";
import { RolesGuard } from "src/contexts/auth/infrastructure/guards/roles.guard";
import { CisternService } from "../../application/services/cistern.service";
import { Roles } from "src/contexts/auth/infrastructure/decorators/roles.decorator";
import { Role } from "src/shared/domain/enums/role.enum";
import { CreateCisternDto } from "../../application/dtos/create-cistern.dto";
import { UpdateCisternDto } from "../../application/dtos/update-cistern.dto";

@Controller('cisterns')
@UseGuards(JwtGuard, RolesGuard)
export class CisternController {
    constructor(private readonly cisternService: CisternService) { }

    @Post()
    @Roles(Role.COMPANY)
    async createCistern(@Body() createCisternDto: CreateCisternDto, @Req() request: any) {
        const { roleId } = request.user;
        return await this.cisternService.createCistern(createCisternDto, roleId);
    }

    @Get()
    @Roles(Role.COMPANY)
    async findAllCistern(@Req() request: any) {
        const { roleId } = request.user;
        return await this.cisternService.findAllCistern(roleId);
    }

    @Put(':id')
    @Roles(Role.COMPANY)
    async updateCistern(
        @Param('id') id: string,
        @Body() updateCisternDto: UpdateCisternDto
    ) {
        return await this.cisternService.updateCistern(id, updateCisternDto);
    }

    @Get(':id')
    @Roles(Role.COMPANY)
    async getCistern(@Param('id') id: string) {
        return await this.cisternService.getCisternById(id);
    }

    @Delete(':id')
    @Roles(Role.COMPANY)
    async deleteCistern(@Param('id') id: string) {
        return await this.cisternService.deleteCistern(id);
    }
}