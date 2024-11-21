import { IsNotEmpty } from "class-validator";

export class CreateZoneDto {
    @IsNotEmpty()
    name: string
    @IsNotEmpty()
    code: string
    @IsNotEmpty()
    description: string
    @IsNotEmpty()
    zipcode: string
}