import { Role } from "src/shared/domain/enums/role.enum";

export class AuthUser {
  constructor(
    public id: string,
    public username: string,
    public role: Role,
    public roleId: string
  ) { }
}