import { Injectable } from '@nestjs/common';

@Injectable()
export class OtpService {
  private readonly OTP_LENGTH = 4;

  private readonly OTP_TTL_SECONDS = 120;

  generateOtp(): string {
    const min = 10 ** (this.OTP_LENGTH - 1);

    const max = 10 ** this.OTP_LENGTH - 1;

    return Math.floor(
      min + Math.random() * (max - min + 1),
    ).toString();
  }

  getExpirationDate(): Date {
    return new Date(
      Date.now() + this.OTP_TTL_SECONDS * 1000,
    );
  }
}