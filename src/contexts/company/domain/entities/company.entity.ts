export class Company {
  constructor(
    public id: string,
    public name: string,
    public identifier: string,
    public logo: string,
    public userId: string,
    public companyId: string,
    public createdAt: Date,
    public updatedAt: Date
  ) { }
}