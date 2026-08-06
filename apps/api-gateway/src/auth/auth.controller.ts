import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { AUTH_PATTERNS, ResendOtpDto, SERVICES, SignupDto, VerifyOtpDto } from 'libs/common';
import { firstValueFrom } from 'rxjs';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject(SERVICES.AUTH_SERVICE) private readonly authClient: ClientProxy,
  ) {}

  @Post('signup')
  signup(
    @Body() signupDto: SignupDto,
  ) {
    return firstValueFrom(
      this.authClient.send(
        AUTH_PATTERNS.SIGNUP,
        signupDto,
      ),
    );
  }
  @Post('verify-otp')
  verifyOtp(
    @Body() verifyOtpDto: VerifyOtpDto, // Replace 'any' with the appropriate DTO type
  ) {
    return firstValueFrom(
      this.authClient.send(
        AUTH_PATTERNS.VERIFY_OTP,
        verifyOtpDto,
      ),
    );
  }
  @Post('resend-otp')
  resendOtp(
    @Body() resendOtpDto: ResendOtpDto, // Replace 'any' with the appropriate DTO type
  ) {
    return firstValueFrom(
      this.authClient.send(
        AUTH_PATTERNS.RESEND_OTP,
        resendOtpDto,
      ),
    );
  }
}