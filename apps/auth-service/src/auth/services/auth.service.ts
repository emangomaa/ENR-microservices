import { Inject, Injectable } from '@nestjs/common';

import { SignupDto } from '../dto/signup.dto';
import { AuthRepository } from '../repositories/auth.repository';
import { PasswordService } from './password.service';
import { OtpService } from './otp.service';
import { PasswordsDoNotMatchException,EmailAlreadyExistsException, UserNotFoundException,AccountAlreadyVerified, OtpAttemptsExceededException, InvalidOtpException } from 'libs/common/exceptions';
import { AUTH_PATTERNS, AuthSignupEvent, RedisKeys, RedisService, SERVICES } from 'libs/common';
import { ClientProxy } from '@nestjs/microservices';
import { VerifyOtpDto } from '../dto/verify-otp.dto';
import { ConfigService } from '@nestjs/config';
import { AuthVerifyOtpEvent } from 'libs/common/events/verify-otp.event';
import {ResendOtpDto} from '../dto/resend-otp.dto'

@Injectable()
export class AuthService {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly passwordService: PasswordService,
    private readonly otpService: OtpService,
    private readonly configService: ConfigService,
    @Inject(SERVICES.NOTIFICATION_SERVICE)
    private readonly notificationClient: ClientProxy,

    private readonly redisService: RedisService
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

    
    const user = await this.authRepository.create({
      email: normalizedEmail,
      passwordHash,
      isVerified: false,
    });


    // Generate OTP and store it in Redis
    const otp = this.otpService.generateOtp();

  
    await this.redisService.setObject(
      RedisKeys.otp(user.id),
      {
          code: otp,
          attempts: 0,
      },
      this.configService.get<number>('OTP_TTL_SECONDS', 120), 
    );


    // publish event to notification service
    this.notificationClient.emit(AUTH_PATTERNS.SIGNUP,new AuthSignupEvent(
      user.id,
      user.email,
      otp
    ))
    return {
      message:
        'Registration successful. Please verify your email.',
    };
  }

  async verifyOtp(verifyOtpDto: VerifyOtpDto): Promise<{ message: string }> {
    const { email, otp } = verifyOtpDto;
    const user = await this.authRepository.findByEmail(email);

    if (!user) {
      throw new UserNotFoundException();
    }

    if (user.isVerified) {
      throw new AccountAlreadyVerified();
    } 

     await this.otpService.verifyOtp(otp, user.id);

      user.isVerified = true;
    await this.authRepository.save(user);

    return {
      message: 'OTP verified successfully.',
    };
  }


  // resend OTP method
  async resendOtp(
  dto: ResendOtpDto,
): Promise<{ message: string }> {
  const email = dto.email.trim().toLowerCase();

  const user =
    await this.authRepository.findByEmail(email);

  if (!user) {
    throw new UserNotFoundException();
  }

  if (user.isVerified) {
    throw new AccountAlreadyVerified();
  }

  const otp = this.otpService.generateOtp();

  await this.redisService.setObject(
    RedisKeys.otp(user.id),
    {
      code: otp,
      attempts: 0,
    },
    this.configService.get<number>('OTP_TTL_SECONDS', 120),
  );

  this.notificationClient.emit(
    AUTH_PATTERNS.SIGNUP,
    new AuthSignupEvent(
      user.id,
      user.email,
      otp,
    ),
  );

  return {
    message:
      'A new verification code has been sent to your email.',
  };
}
}