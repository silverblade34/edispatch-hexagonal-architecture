export class Billing {
  constructor(
    public id: string,
    public description: string,
    public companyId: string,
    public createdAt: Date,
    public updatedAt: Date,
  ) { }
}
