import * as mongoose from 'mongoose';

export const LoadSchema = new mongoose.Schema({
    image: { type: String, required: true },
    supplier: { type: String, required: true },
    amount: { type: String, required: true },
    date: { type: Date, required: true },
    cisternId: { type: mongoose.Schema.Types.ObjectId, ref: 'Cistern', required: true },
    companyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true },
    createdAt: { type: Date, default: Date.now },
});