export class ResponseCompanyDto {
  id: string;
  code: string;
  ubigeo: string;
  address: string;
  email: string;
  phone: string;
  codefiscal: string;
  name: string;
  identifier: string;
  logo: string;
  createdAt: Date;
  updatedAt: Date;
  user: {
    id: string;
    username: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
  };
}
