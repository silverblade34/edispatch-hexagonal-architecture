import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MasterController } from './infrastructure/controllers/master.controller';
import { MasterService } from './application/services/master.service';
import { MasterRepositoryAdapter } from './infrastructure/adapters/mongodb/master.repository.adapter';
import { MasterSchema } from './infrastructure/adapters/mongodb/schemas/master.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Master', schema: MasterSchema }])
  ],
  controllers: [MasterController],
  providers: [
    MasterService,
    {
      provide: 'MasterRepositoryPort',
      useClass: MasterRepositoryAdapter
    }
  ]
})
export class MasterModule {}
