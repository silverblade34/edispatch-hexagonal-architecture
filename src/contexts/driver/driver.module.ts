import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { DriverSchema } from "./infrastructure/adapters/schemas/driver.schema";
import { DriverController } from "./infrastructure/controllers/driver.controller";
import { DriverService } from "./application/services/driver.service";
import { DriverRepositoryAdapter } from "./infrastructure/adapters/driver.repository.adapter";

@Module({
    imports: [
      MongooseModule.forFeature([{ name: 'Driver', schema: DriverSchema  }]),
    ],
    controllers: [DriverController],
    providers: [
      DriverService,
      {
        provide: 'DriverRepositoryPort',
        useClass: DriverRepositoryAdapter,
      },
    ],
  })
export class DriverModule{}