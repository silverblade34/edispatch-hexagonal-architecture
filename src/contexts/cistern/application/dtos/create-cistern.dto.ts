import { IsNotEmpty } from "class-validator"

export class CreateCisternDto {
    @IsNotEmpty()
    code: string
    @IsNotEmpty()
    capacity: string
    @IsNotEmpty()
    plate: string
    @IsNotEmpty()
    documentSeries: string
}