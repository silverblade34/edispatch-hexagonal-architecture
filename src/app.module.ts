import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './contexts/user/user.module';
import { MasterModule } from './contexts/master/master.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/db_edispatch'),
    UserModule,
    MasterModule
  ]
})
export class AppModule {}