import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import Redis from 'ioredis';

import { REDIS_CLIENT } from './redis.constants';
import { RedisService } from './redis.service';

@Global()
@Module({
  imports: [
    ConfigModule,
  ],

  providers: [
    {
      provide: REDIS_CLIENT,

      inject: [ConfigService],

      useFactory: (
        configService: ConfigService,
      ) => {
        return new Redis({
          host: configService.get<string>('REDIS_HOST'),
          port: configService.get<number>('REDIS_PORT'),
          password:
            configService.get<string>('REDIS_PASSWORD') || undefined,
        });
      },
    },

    RedisService,
  ],

  exports: [
    RedisService,
  ],
})
export class RedisModule {}