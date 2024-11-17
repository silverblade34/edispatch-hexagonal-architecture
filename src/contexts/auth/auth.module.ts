import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './application/services/auth.service';
import { JwtService } from './application/services/jwt.service';
import { AuthRepositoryAdapter } from './infrastructure/adapters/auth.repository.adapter';
import { JwtAdapter } from './infrastructure/adapters/jwt.adapter';
import { AuthController } from './infrastructure/controllers/auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from '../user/infrastructure/adapters/mongodb/schemas/user.schema';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule,
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    JwtModule.registerAsync({
      useFactory: async () => ({
        secret: process.env.JWT_SECRET,
        signOptions: { expiresIn: '10h' },
      }),
    }),
  ],
  providers: [
    AuthService,
    JwtService,
    {
      provide: 'AuthRepositoryPort',
      useClass: AuthRepositoryAdapter,
    },
    {
      provide: 'JwtServicePort',
      useClass: JwtAdapter,
    },
  ],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule { }