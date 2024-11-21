import { IsNotEmpty } from "class-validator"

export class CreateBillingDto {
    @IsNotEmpty()
    description: string
}