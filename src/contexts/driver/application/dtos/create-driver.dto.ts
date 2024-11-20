import { IsNotEmpty } from "class-validator";

export class CreateDriverDto {
     @IsNotEmpty()
     name: string;
     @IsNotEmpty()
     lastName: string;
     @IsNotEmpty()
     licenseNumber: string;
     @IsNotEmpty()
     username: string;
     @IsNotEmpty()
     password: string;
}