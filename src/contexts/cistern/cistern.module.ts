import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { CisternSchema } from "./infrastructure/adapters/schemas/cistern.schema";
import { CisternService } from "./application/services/cistern.service";
import { CisternRepositoryAdapter } from "./infrastructure/adapters/cistern.repository.adapter";
import { CisternController } from "./infrastructure/controllers/cistern.controller";

@Module({
    imports: [
      MongooseModule.forFeature([{ name: 'Cistern', schema: CisternSchema  }]),
    ],
    controllers: [CisternController],
    providers: [
      CisternService,
      {
        provide: 'CisternRepositoryPort',
        useClass: CisternRepositoryAdapter,
      },
    ],
  })
export class CisternModule{}