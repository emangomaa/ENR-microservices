import { Controller, Get } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { SignupDto } from '../dto/signup.dto';
import { AUTH_PATTERNS } from 'libs/common';
@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

   @MessagePattern(AUTH_PATTERNS.SIGNUP)
  signup(
    @Payload() signupDto: SignupDto,
  ) {
    return this.authService.signup(signupDto);
  }
}
