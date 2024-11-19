import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateCompanyDto {
  @IsNotEmpty()
  code: string;
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  ubigeo: string;
  @IsNotEmpty()
  address: string;
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @IsNotEmpty()
  phone: string;
  @IsNotEmpty()
  codefiscal: string;
  @IsNotEmpty()
  identifier: string;
  @IsNotEmpty()
  username: string;
  @IsNotEmpty()
  password: string;
}
