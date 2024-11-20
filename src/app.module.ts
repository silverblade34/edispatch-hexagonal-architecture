import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './contexts/user/user.module';
import { MasterModule } from './contexts/master/master.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './contexts/auth/auth.module';
import { CompanyModule } from './contexts/company/company.module';
import { CustomerModule } from './contexts/customer/customer.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.dev.env',
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.DB_URI),
    AuthModule,
    UserModule,
    MasterModule,
    CompanyModule,
    CustomerModule
  ],
})
export class AppModule {}
