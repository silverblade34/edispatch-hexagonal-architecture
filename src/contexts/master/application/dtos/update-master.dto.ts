import { IsNotEmpty } from "class-validator";

export class UpdateMasterDto {
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  identifier: string;
  @IsNotEmpty()
  username: string;
  @IsNotEmpty()
  password: string;
}
