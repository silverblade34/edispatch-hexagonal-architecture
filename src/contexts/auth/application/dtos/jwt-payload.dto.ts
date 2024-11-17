import { Role } from "src/shared/domain/enums/role.enum";

export class JwtPayloadDto {
  sub: string;
  username: string;
  role: Role;
}