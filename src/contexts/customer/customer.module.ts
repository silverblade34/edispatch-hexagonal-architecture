import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { CustomerSchema } from "./infrastructure/adapters/mongodb/schemas/customer.schema";
import { CustomerController } from "./infrastructure/controllers/customer.controller";
import { CustomerService } from "./application/services/customer.service";
import { CustomerRepositoryAdapter } from "./infrastructure/adapters/mongodb/customer.repository.adapter";

@Module({
    imports: [
      MongooseModule.forFeature([{ name: 'Customer', schema: CustomerSchema }]),
    ],
    controllers: [CustomerController],
    providers: [
      CustomerService,
      {
        provide: 'CustomerRepositoryPort',
        useClass: CustomerRepositoryAdapter,
      },
    ],
  })
  export class CustomerModule {}
  