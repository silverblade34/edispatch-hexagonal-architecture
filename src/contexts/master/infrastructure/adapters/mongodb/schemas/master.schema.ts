import * as mongoose from 'mongoose';
import { MasterStatus } from 'src/contexts/master/domain/entities/master.entity';

export const MasterSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  status: { type: String, enum: MasterStatus, default: MasterStatus.PENDING },
  userId: { type: mongoose.Schema.Types.ObjectId, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});