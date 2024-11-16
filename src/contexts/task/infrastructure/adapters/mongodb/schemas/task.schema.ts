import * as mongoose from 'mongoose';
import { TaskStatus } from 'src/contexts/task/domain/entities/task.entity';

export const TaskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  status: { type: String, enum: TaskStatus, default: TaskStatus.PENDING },
  userId: { type: mongoose.Schema.Types.ObjectId, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});