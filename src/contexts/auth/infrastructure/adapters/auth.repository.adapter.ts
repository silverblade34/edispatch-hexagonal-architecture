import { Injectable } from '@nestjs/common';
import { AuthRepositoryPort } from '../../domain/ports/auth.repository.port';
import * as bcrypt from 'bcrypt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/contexts/user/domain/entities/user.entity';

@Injectable()
export class AuthRepositoryAdapter implements AuthRepositoryPort {
  constructor(
    @InjectModel('User') private userModel: Model<User>
  ) { }

  async findByUsername(username: string): Promise<User> {
    return this.userModel.findOne({ username });
  }

  async validateCredentials(userPassword: string, password: string): Promise<boolean> {
    return bcrypt.compare(password, userPassword);
  }
}
