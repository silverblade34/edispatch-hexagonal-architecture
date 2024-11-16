import { Email } from "src/shared/domain/value-objects/email-value-object";

export class User {
  constructor(
    public id: string,
    public name: string,
    public email: string,
    public password: string,
    public createdAt: Date,
    public updatedAt: Date
  ) {}
}
