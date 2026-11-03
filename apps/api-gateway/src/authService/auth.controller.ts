import { Body, Controller, Inject, Post, UseGuards } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { AUTH_PATTERNS, ForgotPasswordDto, LoginDto, ResendOtpDto, SERVICES, SignupDto, VerifyOtpDto } from 'libs/common';
import { ChangePasswordDto } from 'libs/common/dto/auth/change-password.dto';
import { ResetPasswordDto } from 'libs/common/dto/auth/reset-password.dto';
import { firstValueFrom } from 'rxjs';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import type { AuthenticatedUser } from '../auth/interfaces/authenticated-user.interface';
import { RefreshTokenDto } from 'apps/auth-service/src/auth/dto/refresh-token.dto';
import { LogoutDto } from 'apps/auth-service/src/auth/dto/logout.dto';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@Controller('auth')
@ApiTags('Authentication')
export class AuthController {
  constructor(
    @Inject(SERVICES.AUTH_SERVICE) private readonly authClient: ClientProxy,
  ) {}

  @Post('signup')
  @ApiOperation({ summary: 'Create an account' })
  @ApiCreatedResponse({ description: 'Account created; verification instructions sent.' })
  @ApiBadRequestResponse({ description: 'The request body is invalid.' })
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
  @ApiOperation({ summary: 'Verify an account using its one-time password' })
  @ApiCreatedResponse({ description: 'The one-time password was verified.' })
  @ApiBadRequestResponse({ description: 'The request body or one-time password is invalid.' })
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
  @ApiOperation({ summary: 'Resend the account verification one-time password' })
  @ApiCreatedResponse({ description: 'Verification instructions were requested.' })
  @ApiBadRequestResponse({ description: 'The request body is invalid.' })
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
  @ApiOperation({ summary: 'Log in and obtain access credentials' })
  @ApiCreatedResponse({ description: 'Credentials issued.' })
  @ApiBadRequestResponse({ description: 'The request body is invalid or credentials were rejected.' })
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


  @Post('refresh')
  @ApiOperation({ summary: 'Refresh an access token' })
  @ApiCreatedResponse({ description: 'A new access token was issued.' })
  @ApiBadRequestResponse({ description: 'The refresh token is invalid.' })
  async refresh(
  @Body()
  dto: RefreshTokenDto,
) {
  return firstValueFrom(
    this.authClient.send(
      AUTH_PATTERNS.REFRESH_TOKEN,
      dto,
    ),
  );
}

@Post('logout')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('access-token')
@ApiOperation({ summary: 'Log out and revoke a refresh token' })
@ApiCreatedResponse({ description: 'The session was ended.' })
@ApiUnauthorizedResponse({ description: 'A valid access token is required.' })
async logout(
  @CurrentUser()
  user: AuthenticatedUser,

  @Body()
  dto: LogoutDto,
) {
  return firstValueFrom(
    this.authClient.send(
      AUTH_PATTERNS.LOGOUT,
      {
        userId: user.id,
        refreshToken: dto.refreshToken,
      },
    ));
}
  @Post('forgot-password')
  @ApiOperation({ summary: 'Request password reset instructions' })
  @ApiCreatedResponse({ description: 'Password reset instructions were requested.' })
  @ApiBadRequestResponse({ description: 'The request body is invalid.' })
  async forgotPassword(
    @Body() dto: ForgotPasswordDto,
  ) {
    
      this.authClient.emit(
        AUTH_PATTERNS.FORGOT_PASSWORD,
        dto,
      )
  }
  @Post('reset-password')
  @ApiOperation({ summary: 'Reset a password using a one-time password' })
  @ApiCreatedResponse({ description: 'The password was reset.' })
  @ApiBadRequestResponse({ description: 'The request body or one-time password is invalid.' })
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

  @UseGuards(JwtAuthGuard)
  @Post('change-password')
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Change the authenticated user’s password' })
  @ApiCreatedResponse({ description: 'The password was changed.' })
  @ApiBadRequestResponse({ description: 'The request body is invalid.' })
  @ApiUnauthorizedResponse({ description: 'A valid access token is required.' })
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