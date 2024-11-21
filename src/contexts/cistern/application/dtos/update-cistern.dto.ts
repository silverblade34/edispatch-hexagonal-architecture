import { IsNotEmpty } from "class-validator"

export class UpdateCisternDto {
    @IsNotEmpty()
    code: string
    @IsNotEmpty()
    capacity: string
    @IsNotEmpty()
    plate: string
    @IsNotEmpty()
    documentSeries: string
}