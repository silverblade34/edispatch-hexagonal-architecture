export class Company {
  constructor(
    public id: string,
    public code: string,
    public name: string,
    public logo: string,
    public ubigeo: string,
    public address: string,
    public email: string,
    public phone: string,
    public codefiscal: string,
    public identifier: string,
    public userId: string,
    public masterId: string,
    public createdAt: Date,
    public updatedAt: Date,
  ) {}
}
