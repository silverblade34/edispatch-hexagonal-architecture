import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { BillingSchema } from "./infrastructure/adapters/mongodb/schemas/billing.schema";
import { BillingService } from "./application/services/billing.service";
import { BillingRepositoryAdapter } from "./infrastructure/adapters/mongodb/billing.repository.adapter";
import { BillingController } from "./infrastructure/controllers/billing.controller";

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'Billing', schema: BillingSchema }]),
    ],
    controllers: [BillingController],
    providers: [
        BillingService,
        {
            provide: 'BillingRepositoryPort',
            useClass: BillingRepositoryAdapter,
        },
    ],
})
export class BillingModule { }