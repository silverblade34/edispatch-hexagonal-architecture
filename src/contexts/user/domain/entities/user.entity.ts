export class User {
  constructor(
    public id: string,
    public username: string,
    public password: string,
    public role: 'SUPER_MASTER' | 'MASTER' | 'COMPANY',
    public createdAt: Date,
    public updatedAt: Date
  ) { }
}
