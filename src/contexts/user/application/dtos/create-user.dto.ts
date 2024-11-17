import { IsIn, IsNotEmpty } from "class-validator"
import { Role } from "src/shared/domain/enums/role.enum"

export class CreateUserDto {
  @IsNotEmpty()
  username: string
  @IsNotEmpty()
  password: string
  @IsIn(['SUPERMASTER', 'MASTER', 'COMPANY'])
  role: Role
}