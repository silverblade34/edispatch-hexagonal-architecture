import { Module } from '@nestjs/common';
import { SharedExternalModule } from 'src/shared/external/shared-external.module';
import { UserModule } from '../user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CompanySchema } from './infrastructure/adapters/mongodb/schemas/company.schema';
import { CompanyController } from './infrastructure/controllers/company.controller';
import { CompanyService } from './application/services/company.service';
import { CompanyRepositoryAdapter } from './infrastructure/adapters/mongodb/company.repository.adapter';

@Module({
  imports: [
    SharedExternalModule,
    UserModule,
    MongooseModule.forFeature([{ name: 'Company', schema: CompanySchema }]),
  ],
  controllers: [CompanyController],
  providers: [
    CompanyService,
    {
      provide: 'CompanyRepositoryPort',
      useClass: CompanyRepositoryAdapter,
    },
  ],
})
export class CompanyModule {}
