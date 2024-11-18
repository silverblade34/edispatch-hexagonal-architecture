import { Injectable, NotFoundException, ConflictException, Inject } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserRepositoryPort } from '../../domain/ports/user.repository.port';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { User } from '../../domain/entities/user.entity';

@Injectable()
export class UserService {
    constructor(
        @Inject('UserRepositoryPort')
        private readonly userRepository: UserRepositoryPort
    ) { }

    async createUser(createUserDto: CreateUserDto): Promise<User> {
        const existingUser = await this.userRepository.findByUsername(createUserDto.username);
        if (existingUser) {
            throw new ConflictException('El usuario ya se encuentra registrado');
        }

        const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

        const user = new User(
            undefined,
            createUserDto.username,
            hashedPassword,
            createUserDto.role,
            new Date(),
            new Date()
        );

        return await this.userRepository.create(user);
    }

    async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<User> {
        const existingUser = await this.userRepository.findById(id);
        if (!existingUser) {
            throw new NotFoundException('El usuario no se encuentra registrado');
        }

        if (updateUserDto.username) {
            const usernameInUse = await this.userRepository.findByUsername(updateUserDto.username);
            if (usernameInUse && usernameInUse.id != id) {
                throw new ConflictException('El usuario ya se encuentra en uso');
            }
        }
        let password = existingUser.password;
        if (updateUserDto.password != existingUser.password) {
            password = await bcrypt.hash(updateUserDto.password, 10);
        }
        return await this.userRepository.update(id, { ...updateUserDto, password });
    }

    async getUserById(id: string): Promise<User> {
        const user = await this.userRepository.findById(id);
        if (!user) {
            throw new NotFoundException('El usuario no se encuentra registrado');
        }
        return user;
    }

    async deleteUser(id: string): Promise<void> {
        const user = await this.userRepository.findById(id);
        if (!user) {
            throw new NotFoundException('El usuario no se encuentra registrado');
        }
        await this.userRepository.delete(id);
    }
}