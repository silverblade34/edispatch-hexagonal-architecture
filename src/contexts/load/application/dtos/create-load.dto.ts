import { IsNotEmpty } from "class-validator"

export class CreateLoadDto {
    @IsNotEmpty()
    date: Date
    @IsNotEmpty()
    cisternId: string
    @IsNotEmpty()
    supplier: string
    @IsNotEmpty()
    amount: number
}