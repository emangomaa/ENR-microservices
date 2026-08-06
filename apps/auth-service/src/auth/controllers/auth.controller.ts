import { Controller, Get } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { SignupDto } from '../dto/signup.dto';
import { AUTH_PATTERNS, ResendOtpDto } from 'libs/common';
import { VerifyOtpDto } from '../dto/verify-otp.dto';
@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

   @MessagePattern(AUTH_PATTERNS.SIGNUP)
  signup(
    @Payload() signupDto: SignupDto,
  ) {
    return this.authService.signup(signupDto);
  }


  @MessagePattern(AUTH_PATTERNS.VERIFY_OTP)
  verifyOtp(
    @Payload() verifyOtpDto: VerifyOtpDto,
  ) {
    return this.authService.verifyOtp(verifyOtpDto);
  }
  @MessagePattern(AUTH_PATTERNS.RESEND_OTP)
  resendOtp(
    @Payload() resendOtpDto: ResendOtpDto,
  ) {
    return this.authService.resendOtp(resendOtpDto);
  }
}
