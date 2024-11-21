import { IsNotEmpty } from "class-validator";

export class UpdateZoneDto {
    @IsNotEmpty()
    name: string
    @IsNotEmpty()
    code: string
    @IsNotEmpty()
    description: string
    @IsNotEmpty()
    zipcode: string
}