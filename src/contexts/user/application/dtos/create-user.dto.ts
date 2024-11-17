export class CreateUserDto {
  id: string
  username: string
  password: string
  role: 'SUPER_MASTER' | 'MASTER' | 'COMPANY'
}