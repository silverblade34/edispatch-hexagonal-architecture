import * as mongoose from 'mongoose';

export const CisternSchema = new mongoose.Schema({
    code: { type: String, required: true, unique: true },
    capacity: { type: String, required: true },
    plate: { type: String, required: true },
    documentSeries: { type: String, required: true, unique: true },
    companyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});