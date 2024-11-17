import * as mongoose from 'mongoose';

export const MasterSchema = new mongoose.Schema({
  name: { type: String, required: true },
  identifier: { type: String, required: true },
  logo: { type: String, required: true  },
  userId: { type: mongoose.Schema.Types.ObjectId, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});