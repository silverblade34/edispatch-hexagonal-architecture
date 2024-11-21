import * as mongoose from 'mongoose';

export const DriverSchema = new mongoose.Schema({
  name: { type: String, required: true },
  lastName: { type: String, required: true },
  licenseNumber: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  companyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});