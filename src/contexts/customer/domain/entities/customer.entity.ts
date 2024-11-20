export class Customer {
    constructor(
      public id: string,
      public name: string,
      public code: string,
      public document: string,
      public business: string,
      public ubigeo: string,
      public address: string,
      public email: string,
      public phone: string,
      public companyId: string,
      public createdAt: Date,
      public updatedAt: Date
    ) { }
  }