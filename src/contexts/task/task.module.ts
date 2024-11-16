import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TaskController } from './infrastructure/controllers/task.controller';
import { TaskService } from './application/services/task.service';
import { TaskRepositoryAdapter } from './infrastructure/adapters/mongodb/task.repository.adapter';
import { TaskSchema } from './infrastructure/adapters/mongodb/schemas/task.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Task', schema: TaskSchema }])
  ],
  controllers: [TaskController],
  providers: [
    TaskService,
    {
      provide: 'TaskRepositoryPort',
      useClass: TaskRepositoryAdapter
    }
  ]
})
export class TaskModule {}
