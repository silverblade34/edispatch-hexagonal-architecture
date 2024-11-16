import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './infrastructure/controllers/user.controller';
import { UserService } from './application/services/user.service';
import { UserRepositoryAdapter } from './infrastructure/adapters/mongodb/user.repository.adapter';
import { UserSchema } from './infrastructure/adapters/mongodb/schemas/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])
  ],
  controllers: [UserController],
  providers: [
    UserService,
    {
      provide: 'UserRepositoryPort',
      useClass: UserRepositoryAdapter
    }
  ],
  exports: [UserService]
})
export class UserModule {}