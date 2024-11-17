export enum MasterStatus {
    PENDING = 'PENDING',
    IN_PROGRESS = 'IN_PROGRESS',
    COMPLETED = 'COMPLETED'
  }
  
  export class Master {
    constructor(
      public id: string,
      public title: string,
      public description: string,
      public status: MasterStatus,
      public userId: string,
      public createdAt: Date,
      public updatedAt: Date
    ) {}
  }