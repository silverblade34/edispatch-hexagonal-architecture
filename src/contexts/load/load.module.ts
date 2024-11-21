import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { LoadSchema } from "./infrastructure/adapters/mongodb/schemas/load.schema";
import { LoadController } from "./infrastructure/controllers/load.controller";
import { LoadService } from "./application/services/load.service";
import { LoadRepositoryAdapter } from "./infrastructure/adapters/mongodb/load.repository.adapter";
import { SharedExternalModule } from "src/shared/external/shared-external.module";

@Module({
    imports: [
      SharedExternalModule,
      MongooseModule.forFeature([{ name: 'Load', schema: LoadSchema }]),
    ],
    controllers: [LoadController],
    providers: [
      LoadService,
      {
        provide: 'LoadRepositoryPort',
        useClass: LoadRepositoryAdapter,
      },
    ],
  })
  export class LoadModule { }