export enum TaskStatus {
    PENDING = 'PENDING',
    IN_PROGRESS = 'IN_PROGRESS',
    COMPLETED = 'COMPLETED'
  }
  
  export class Task {
    constructor(
      public id: string,
      public title: string,
      public description: string,
      public status: TaskStatus,
      public userId: string,
      public createdAt: Date,
      public updatedAt: Date
    ) {}
  }