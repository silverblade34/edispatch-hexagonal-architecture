import { Injectable, NotFoundException, ConflictException, Inject } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserRepositoryPort } from '../../domain/ports/user.repository.port';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { User } from '../../domain/entities/user.entity';
import { Email } from 'src/shared/domain/value-objects/email-value-object';

@Injectable()
export class UserService {
    constructor(
        @Inject('UserRepositoryPort')
        private readonly userRepository: UserRepositoryPort
    ) { }

    async createUser(createUserDto: CreateUserDto): Promise<User> {
        const existingUser = await this.userRepository.findByEmail(createUserDto.email);
        if (existingUser) {
            throw new ConflictException('Email already exists');
        }

        const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

        const user = new User(
            undefined,
            createUserDto.name,
            createUserDto.email,
            hashedPassword,
            new Date(),
            new Date()
        );

        return await this.userRepository.create(user);
    }

    async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<User> {
        const existingUser = await this.userRepository.findById(id);
        if (!existingUser) {
            throw new NotFoundException('User not found');
        }

        if (updateUserDto.email) {
            const emailInUse = await this.userRepository.findByEmail(updateUserDto.email);
            if (emailInUse && emailInUse.id !== id) {
                throw new ConflictException('Email already in use');
            }
            updateUserDto.email = new Email(updateUserDto.email).toString();
        }

        return await this.userRepository.update(id, updateUserDto);
    }

    async getUserById(id: string): Promise<User> {
        const user = await this.userRepository.findById(id);
        if (!user) {
            throw new NotFoundException('User not found');
        }
        return user;
    }

    async deleteUser(id: string): Promise<void> {
        const user = await this.userRepository.findById(id);
        if (!user) {
            throw new NotFoundException('User not found');
        }
        await this.userRepository.delete(id);
    }
}