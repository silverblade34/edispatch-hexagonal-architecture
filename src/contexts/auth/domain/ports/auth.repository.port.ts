import { User } from "src/contexts/user/domain/entities/user.entity";

export interface AuthRepositoryPort {
    findByUsername(username: string): Promise<User>;
    validateCredentials(userPassword: string, password: string): Promise<boolean>;
}