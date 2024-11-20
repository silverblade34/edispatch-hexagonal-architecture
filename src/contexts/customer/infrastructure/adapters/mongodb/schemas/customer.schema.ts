import * as mongoose from 'mongoose';

export const CustomerSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    code: { type: String, required: true },
    document: { type: String, required: true, unique: true },
    business: { type: String, required: true },
    ubigeo: { type: String, required: true },
    address: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    companyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});
