import { Task } from "../entities/task.entity";

export interface TaskRepositoryPort {
    create(task: Task): Promise<Task>;
    findById(id: string): Promise<Task>;
    findByUserId(userId: string): Promise<Task[]>;
    update(id: string, task: Partial<Task>): Promise<Task>;
    delete(id: string): Promise<void>;
  }