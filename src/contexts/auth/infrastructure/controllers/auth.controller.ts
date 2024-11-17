import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "../../application/services/auth.service";
import { LoginDto } from "../../application/dtos/login.dto";

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const token = await this.authService.login(loginDto.username, loginDto.password);
    return { access_token: token };
  }
}