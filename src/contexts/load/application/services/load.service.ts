import { BadRequestException, Inject, Injectable, NotFoundException } from "@nestjs/common";
import { LoadRepositoryPort } from "../../domain/ports/load.repository.port";
import { Load } from "../../domain/entities/load.entity";
import { CreateLoadDto } from "../dtos/create-load.dto";
import { FileUploadService } from "src/shared/external/services/file-upload.service";
import { ReportLoadDto } from "../dtos/report-load.dto";

@Injectable()
export class LoadService {
    constructor(
        @Inject('LoadRepositoryPort')
        private readonly loadRepository: LoadRepositoryPort,
        private readonly fileUploadService: FileUploadService,
    ) { }

    private validateImage(image: any): void {
        const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/jpg'];
        if (!image) {
          throw new NotFoundException('Debe cargar una imagen de evidencia');
        }
        if (!allowedMimeTypes.includes(image.mimetype)) {
          throw new BadRequestException(
            'El archivo debe ser una imagen (jpeg, png, jpg)',
          );
        }
      }

    async createLoad(createLoadDto: CreateLoadDto, roleId: string, images: any): Promise<Load> {
        const image = images[0];
        this.validateImage(image);
        const publicUrl = await this.fileUploadService.uploadLogo(image);

        const load = new Load(
            undefined,
            publicUrl,
            createLoadDto.supplier,
            createLoadDto.amount,
            createLoadDto.date,
            roleId,
            createLoadDto.cisternId,
            new Date(),
        );
        return await this.loadRepository.create(load);
    }

    async findReportLoad(reportLoadDto: ReportLoadDto, roleId: string): Promise<Load[]> {
        const loads = await this.loadRepository.findReport(reportLoadDto.fromDate, reportLoadDto.toDate, roleId);
        return loads;
    }
}