import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Redis from 'ioredis';

import { REDIS_CLIENT } from './redis.constants';

@Injectable()
export class RedisService {
  constructor(
    private readonly configService: ConfigService,

    @Inject(REDIS_CLIENT)
    private readonly redis: Redis,
  ) {}

  createClient(): Redis {
    return new Redis({
      host: this.configService.get<string>('redis.host'),
      port: this.configService.get<number>('redis.port'),
      password:
        this.configService.get<string>('redis.password') || undefined,
    });
  }

   async setObject<T>(
        key: string,
        value: T,
        ttl: number,
    ): Promise<void> {

        await this.redis.set(
            key,
            JSON.stringify(value),
            'EX',
            ttl,
        );
    }

  async getObject<T>(
        key: string,
    ): Promise<T | null> {

        const value =
            await this.redis.get(key);

        if (!value) {
            return null;
        }

        return JSON.parse(value) as T;
    }

  async del(key: string): Promise<void> {
    await this.redis.del(key);
  }

  async expire(
    key: string,
    seconds: number,
  ): Promise<void> {
    await this.redis.expire(key, seconds);
  }

  async ttl(
  key: string,
): Promise<number> {
  return this.redis.ttl(key);
}

async exists(key: string): Promise<boolean> {
  const result = await this.redis.exists(key);

  return result === 1;
}
}