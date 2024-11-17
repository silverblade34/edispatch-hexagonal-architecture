import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './contexts/user/user.module';
import { MasterModule } from './contexts/master/master.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './contexts/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.dev.env',
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.DB_URI),
    AuthModule,
    UserModule,
    MasterModule
  ]
})
export class AppModule {}