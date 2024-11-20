import { IsNotEmpty } from "class-validator";

export class UpdateCustomerDto {
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  code: string;
  @IsNotEmpty()
  document: string;
  @IsNotEmpty()
  business: string;
  @IsNotEmpty()
  ubigeo: string;
  @IsNotEmpty()
  address: string;
  @IsNotEmpty()
  email: string;
  @IsNotEmpty()
  phone: string;
}
