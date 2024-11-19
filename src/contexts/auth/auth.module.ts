import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './application/services/auth.service';
import { JwtService } from './application/services/jwt.service';
import { AuthRepositoryAdapter } from './infrastructure/adapters/auth.repository.adapter';
import { JwtAdapter } from './infrastructure/adapters/jwt.adapter';
import { AuthController } from './infrastructure/controllers/auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from '../user/infrastructure/adapters/mongodb/schemas/user.schema';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './infrastructure/strategies/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtGuard } from './infrastructure/guards/jwt.guard';
import { RolesGuard } from './infrastructure/guards/roles.guard';
import { MasterRepositoryAdapter } from '../master/infrastructure/adapters/mongodb/master.repository.adapter';
import { MasterSchema } from '../master/infrastructure/adapters/mongodb/schemas/master.schema';
import { CompanyRepositoryAdapter } from '../company/infrastructure/adapters/mongodb/company.repository.adapter';
import { CompanySchema } from '../company/infrastructure/adapters/mongodb/schemas/company.schema';

@Module({
  imports: [
    ConfigModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    MongooseModule.forFeature([{ name: 'Company', schema: CompanySchema }]),
    MongooseModule.forFeature([{ name: 'Master', schema: MasterSchema }]),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '10h' },
      }),
    }),
  ],
  providers: [
    AuthService,
    JwtService,
    JwtStrategy,
    {
      provide: 'CompanyRepositoryPort',
      useClass: CompanyRepositoryAdapter,
    },
    {
      provide: 'MasterRepositoryPort',
      useClass: MasterRepositoryAdapter,
    },
    {
      provide: 'AuthRepositoryPort',
      useClass: AuthRepositoryAdapter,
    },
    {
      provide: 'JwtServicePort',
      useClass: JwtAdapter,
    },
    JwtGuard,
    RolesGuard,
  ],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
