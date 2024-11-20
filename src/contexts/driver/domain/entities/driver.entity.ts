export class Driver {
    constructor(
      public id: string,
      public name: string,
      public lastName: string,
      public licenseNumber: string,
      public username: string,
      public password: string,
      public companyId: string,
      public createdAt: Date,
      public updatedAt: Date
    ) { }
  }