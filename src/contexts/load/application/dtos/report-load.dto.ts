import { IsNotEmpty } from "class-validator"

export class ReportLoadDto {
    @IsNotEmpty()
    fromDate: Date
    @IsNotEmpty()
    toDate: Date
}