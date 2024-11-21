import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Load } from "src/contexts/load/domain/entities/load.entity";
import { LoadRepositoryPort } from "src/contexts/load/domain/ports/load.repository.port";

@Injectable()
export class LoadRepositoryAdapter implements LoadRepositoryPort {
    constructor(@InjectModel('Load') private cisternModel: Model<Load>) { }

    async create(cistern: Load): Promise<Load> {
        const createdCistern = new this.cisternModel(cistern);
        return await createdCistern.save();
    }

    async findReport(fromDate: Date, toDate: Date, companyId: string): Promise<Load[]> {
        return await this.cisternModel
            .find({
                date: {
                    $gte: fromDate,
                    $lte: toDate,
                },
                companyId
            })
            .exec();
    }
}
