import { Injectable } from '@nestjs/common';
import { VerifyOtpDto } from '../dto/verify-otp.dto';
import { RedisService } from 'libs/common/redis/redis.service';
import { RedisKeys } from 'libs/common/redis/redis.keys';
import { InvalidOtpException } from 'libs/common/exceptions';
import { OtpAttemptsExceededException, OtpData } from 'libs/common';
import { ConfigService } from '@nestjs/config';
import { ExpiredOtpException } from 'libs/common/exceptions/expired-otp-exception';
@Injectable()
export class OtpService {

  constructor(private readonly redisService: RedisService, private readonly configService: ConfigService) {}
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

  async verifyOtp(otp: string,userId: number): Promise<void> {
  
    const key = RedisKeys.otp(userId);
    const otpData = await this.redisService.getObject<OtpData>(key);

    if (!otpData) {
      throw new ExpiredOtpException();
    }

    if (otpData.code !== otp) {
      otpData.attempts += 1;

      if (otpData.attempts >= this.configService.get<number>('OTP_MAX_ATTEMPTS', 5)) {
       this.redisService.del(key);
      throw new OtpAttemptsExceededException();
      }

      const ttl =
      await this.redisService.ttl(key);

      await this.redisService.setObject(
        key,
        otpData,
        ttl,
      );
      throw new InvalidOtpException();
    }
    
    await this.redisService.del(key );

    
  }
}