import { Body, Controller, Inject, Post, UseGuards } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { AUTH_PATTERNS, ForgotPasswordDto, LoginDto, ResendOtpDto, SERVICES, SignupDto, VerifyOtpDto } from 'libs/common';
import { ChangePasswordDto } from 'libs/common/dto/auth/change-password.dto';
import { ResetPasswordDto } from 'libs/common/dto/auth/reset-password.dto';
import { firstValueFrom } from 'rxjs';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import type { AuthenticatedUser } from '../auth/interfaces/authenticated-user.interface';

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

   @Post('login')
  async login(
    @Body() dto: LoginDto,
  ) {
    return firstValueFrom(
      this.authClient.send(
        AUTH_PATTERNS.LOGIN,
        dto,
      ),
    );
  }


  @Post('forgot-password')
  async forgotPassword(
    @Body() dto: ForgotPasswordDto, // Replace 'any' with the appropriate DTO type
  ) {
    
      this.authClient.emit(
        AUTH_PATTERNS.FORGOT_PASSWORD,
        dto,
      )
  }
  @Post('reset-password')
  async resetPassword(
    @Body() dto: ResetPasswordDto, // Replace 'any' with the appropriate DTO type
  ) {
    return firstValueFrom(
      this.authClient.send(
        AUTH_PATTERNS.RESET_PASSWORD,
        dto,
      )
    );
  }

  @Post('change-password')
@UseGuards(JwtAuthGuard)
  async changePassword(
    @Body() dto: ChangePasswordDto, 
    @CurrentUser() user: AuthenticatedUser, // Assuming the user object has an 'id' property
) {
  return firstValueFrom(
    this.authClient.send(
      AUTH_PATTERNS.CHANGE_PASSWORD,
      {
        userId: user.id,
        dto,
      },
    ),
  );
}
}