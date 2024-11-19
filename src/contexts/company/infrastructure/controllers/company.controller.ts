import {
  Controller,
  Post,
  Put,
  Get,
  Body,
  Param,
  UseInterceptors,
  UploadedFiles,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';

import { FilesInterceptor } from '@nestjs/platform-express';
import { Roles } from 'src/contexts/auth/infrastructure/decorators/roles.decorator';
import { Role } from 'src/shared/domain/enums/role.enum';
import { RolesGuard } from 'src/contexts/auth/infrastructure/guards/roles.guard';
import { JwtGuard } from 'src/contexts/auth/infrastructure/guards/jwt.guard';
import { CompanyService } from '../../application/services/company.service';
import { CreateCompanyDto } from '../../application/dtos/create-company.dto';
import { UpdateCompanyDto } from '../../application/dtos/update-company.dto';

@Controller('companies')
@UseGuards(JwtGuard, RolesGuard)
@Roles(Role.MASTER)
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Get()
  async findAllCompany(@Req() request: any) {
    const { roleId } = request.user;
    return await this.companyService.findAllCompany(roleId);
  }

  @Post()
  @UseInterceptors(FilesInterceptor('image'))
  async createCompany(
    @Req() request: any,
    @UploadedFiles() image: any,
    @Body() createCompanyDto: CreateCompanyDto,
  ) {
    const { roleId } = request.user;
    return await this.companyService.createCompany(
      createCompanyDto,
      image,
      roleId,
    );
  }

  @Put(':id')
  @UseInterceptors(FilesInterceptor('image'))
  async updateCompany(
    @Param('id') id: string,
    @UploadedFiles() image: any,
    @Body() updateCompanyDto: UpdateCompanyDto,
  ) {
    return await this.companyService.updateCompany(id, updateCompanyDto, image);
  }

  @Delete(':id')
  async deleteCompany(@Param('id') id: string) {
    return await this.companyService.deleteCompany(id);
  }
}
