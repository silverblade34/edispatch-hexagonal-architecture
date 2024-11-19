export class Company {
  constructor(
    public id: string,
    public name: string,
    public identifier: string,
    public logo: string,
    public userId: string,
    public masterId: string,
    public createdAt: Date,
    public updatedAt: Date,
  ) {}
}
