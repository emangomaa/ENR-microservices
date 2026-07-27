import { Inject, Injectable } from '@nestjs/common';

import { SignupDto } from '../dto/signup.dto';
import { AuthRepository } from '../repositories/auth.repository';
import { PasswordService } from './password.service';
import { OtpService } from './otp.service';
import { PasswordsDoNotMatchException,EmailAlreadyExistsException, UserNotFoundException,AccountAlreadyVerified, OtpAttemptsExceededException, InvalidOtpException } from 'libs/common/exceptions';
import { AUTH_PATTERNS, AuthSignupEvent, SERVICES } from 'libs/common';
import { ClientProxy } from '@nestjs/microservices';
import { VerifyOtpDto } from '../dto/verify-otp.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly passwordService: PasswordService,
    private readonly otpService: OtpService,

    @Inject(SERVICES.NOTIFICATION_SERVICE)
    private readonly notificationClient: ClientProxy,
  ) {}

  async signup(signupDto: SignupDto): Promise<{ message: string }> {
    const {
      email,
      password,
      confirmPassword,
    } = signupDto;

    const normalizedEmail = email.trim().toLowerCase();

    if (password !== confirmPassword) {
      throw new PasswordsDoNotMatchException();
    }

    const existingUser =
      await this.authRepository.findByEmail(normalizedEmail);

    if (existingUser) {
      throw new EmailAlreadyExistsException(normalizedEmail);
    }

    const passwordHash =
      await this.passwordService.hash(password);

    const otpHash =
      this.otpService.generateOtp();

    const otpExpiresAt =
      this.otpService.getExpirationDate();

    const user = await this.authRepository.create({
      email: normalizedEmail,
      passwordHash,
      isVerified: false,
      otpHash,
      otpExpiresAt,
      otpAttempts: 0,
    });

    // publish event to notification service
    this.notificationClient.emit(AUTH_PATTERNS.SIGNUP,new AuthSignupEvent(
      user.id,
      user.email,
      user.otpHash
    ))
    return {
      message:
        'Registration successful. Please verify your email.',
    };
  }

}