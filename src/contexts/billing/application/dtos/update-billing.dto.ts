import { IsNotEmpty } from "class-validator"

export class UpdateBillingDto {
    @IsNotEmpty()
    description: string
}