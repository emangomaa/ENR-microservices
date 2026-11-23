import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { RedisKeys, RedisService } from 'libs/common';

const MAX_SIGNUPS = 5;
const WINDOW_SECONDS = 60 * 60 * 24 * 7; // 1 week

@Injectable()
export class SignupRateLimitService {
  constructor(private readonly redisService: RedisService) {}

  // Called BEFORE signup: block if the limit is already reached
  async assertAllowed(ip: string): Promise<void> {
    const count =
      (await this.redisService.getObject<number>(RedisKeys.signupLimit(ip))) ?? 0;

    if (count >= MAX_SIGNUPS) {
      throw new HttpException(
        {
          statusCode: HttpStatus.TOO_MANY_REQUESTS,
          message: 'Too many accounts created from this device. Try again later.',
          error: 'Too Many Requests',
        },
        HttpStatus.TOO_MANY_REQUESTS,
      );
    }
  }

  // Called AFTER a successful signup
  async recordSignup(ip: string): Promise<void> {
    const key = RedisKeys.signupLimit(ip);
    const count = await this.redisService.incr(key);

    // first signup starts the 7-day window
    if (count === 1) {
      await this.redisService.expire(key, WINDOW_SECONDS);
    }
  }
}