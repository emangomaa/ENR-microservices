import { Controller } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { SignupDto } from '../dto/signup.dto';
import { AUTH_PATTERNS, ForgotPasswordDto, ResendOtpDto } from 'libs/common';
import { VerifyOtpDto } from '../dto/verify-otp.dto';
import { LoginDto } from '../dto/login.dto';
import { ResetPasswordDto } from 'libs/common/dto/auth/reset-password.dto';
import { RefreshTokenDto } from '../dto/refresh-token.dto';
import { ChangePasswordDto } from 'libs/common/dto/auth/change-password.dto';
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

  @MessagePattern(AUTH_PATTERNS.LOGIN)
  async login(
  @Payload() dto: LoginDto,
) {
  return this.authService.login(dto);
  }

  @MessagePattern(AUTH_PATTERNS.REFRESH_TOKEN)
async refresh(
  @Payload()
  dto: RefreshTokenDto,
) {
  return this.authService.refreshAccessToken(
    dto.refreshToken,
  );
}

  @MessagePattern(AUTH_PATTERNS.LOGOUT)
  async logout(
    @Payload() payload: { userId: number; refreshToken: string },  
  ) { 
    return this.authService.logout(
      payload.userId,
      payload.refreshToken,
    );
  }
  @MessagePattern(AUTH_PATTERNS.FORGOT_PASSWORD)
  async forgotPassword(
    @Payload() dto: ForgotPasswordDto,
  ) {
    return this.authService.forgotPassword(dto);
  }
  @MessagePattern(AUTH_PATTERNS.RESET_PASSWORD)
  async resetPassword(
    @Payload() dto: ResetPasswordDto,
  ) {
    return this.authService.resetPassword(dto);
  }
  @MessagePattern(AUTH_PATTERNS.CHANGE_PASSWORD)
  async changePassword(
    @Payload() payload: { dto: ChangePasswordDto; userId: number },
  ) {
    return this.authService.changePassword(payload.userId, payload.dto);
  }
}
