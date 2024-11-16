export class Email {
    private readonly email: string;
  
    constructor(email: string) {
      this.ensureValidEmail(email);
      this.email = email;
    }
  
    private ensureValidEmail(email: string): void {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        throw new Error('Invalid email format');
      }
    }
  
    toString(): string {
      return this.email;
    }
  }
  