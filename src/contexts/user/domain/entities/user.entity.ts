import { Role } from "src/shared/domain/enums/role.enum";

export class User {
  constructor(
    public id: string,
    public username: string,
    public password: string,
    public role: Role,
    public createdAt: Date,
    public updatedAt: Date
  ) { }
}
