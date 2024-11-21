import { Body, Controller, HttpCode, Post, Req, UploadedFiles, UseGuards, UseInterceptors } from "@nestjs/common";
import { JwtGuard } from "src/contexts/auth/infrastructure/guards/jwt.guard";
import { RolesGuard } from "src/contexts/auth/infrastructure/guards/roles.guard";
import { LoadService } from "../../application/services/load.service";
import { Roles } from "src/contexts/auth/infrastructure/decorators/roles.decorator";
import { Role } from "src/shared/domain/enums/role.enum";
import { CreateLoadDto } from "../../application/dtos/create-load.dto";
import { FilesInterceptor } from "@nestjs/platform-express";
import { ReportLoadDto } from "../../application/dtos/report-load.dto";

@Controller('loads')
@UseGuards(JwtGuard, RolesGuard)
export class LoadController {
    constructor(private readonly loadService: LoadService) { }

    @Post()
    @Roles(Role.COMPANY)
    @UseInterceptors(FilesInterceptor('image'))
    async createLoad(@UploadedFiles() image: any, @Body() createCisternDto: CreateLoadDto, @Req() request: any) {
        const { roleId } = request.user;
        return await this.loadService.createLoad(createCisternDto, roleId, image);
    }

    @Post('/report')
    @Roles(Role.COMPANY)
    @HttpCode(200)
    async reportLoad(@Body() reportLoadDto: ReportLoadDto, @Req() request: any) {
        const { roleId } = request.user;
        return await this.loadService.findReportLoad(reportLoadDto, roleId);
    }
}