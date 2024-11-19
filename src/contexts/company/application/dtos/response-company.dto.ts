export class ResponseCompanyDto {
    id: string;
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
  